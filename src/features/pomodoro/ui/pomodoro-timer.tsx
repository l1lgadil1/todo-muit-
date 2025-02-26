import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../../../shared/types/task';
import { useTranslation } from '../../../shared/i18n/language-context';
import { usePomodoroManager } from '../model/use-pomodoro-manager';
import styles from './pomodoro-timer.module.css';

interface PomodoroSettings {
  workDuration: number;
  restDuration: number;
  totalCycles: number;
  longRestDuration: number;
  cyclesBeforeLongRest: number;
}

type PomodoroTimerProps = {
  tasks?: Task[];
  onTaskStatusChange?: (taskId: string, status: Task['status']) => void;
  selectedTaskId?: string;
  onSelectTask: (taskId: string) => void;
};

const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25 * 60,
  restDuration: 5 * 60,
  totalCycles: 4,
  longRestDuration: 15 * 60,
  cyclesBeforeLongRest: 2,
};

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ 
  tasks = [], 
  onTaskStatusChange = () => {},
  selectedTaskId,
  onSelectTask
}) => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    try {
      const savedSettings = localStorage.getItem('pomodoroSettings');
      return savedSettings ? { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) } : DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  });
  
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [cycles, setCycles] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const {
    activeSession,
    completedSessions,
    isLoading,
    error,
    startSession,
    completeSession
  } = usePomodoroManager(selectedTask);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('pomodoroProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setTimeLeft(progress.timeLeft);
        setIsWorkTime(progress.isWorkTime);
        setCycles(progress.cycles);
        setCompletedCycles(progress.completedCycles);
        setTotalTimeSpent(progress.totalTimeSpent);
        
        if (progress.selectedTaskId) {
          const task = tasks.find(t => t.id === progress.selectedTaskId);
          if (task) {
            setSelectedTask(task);
          }
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, [tasks]);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  // Save progress when it changes
  useEffect(() => {
    const progress = {
      timeLeft,
      isWorkTime,
      cycles,
      completedCycles,
      totalTimeSpent,
      selectedTaskId: selectedTask?.id || null,
    };
    localStorage.setItem('pomodoroProgress', JSON.stringify(progress));
  }, [timeLeft, isWorkTime, cycles, completedCycles, totalTimeSpent, selectedTask]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleTaskSelect = (taskId: string | null) => {
    if (isRunning) {
      pauseTimer();
    }
    
    const task = taskId ? tasks.find(t => t.id === taskId) || null : null;
    setSelectedTask(task);
  };

  const startTimer = async () => {
    if (!timerRef.current) {
      if (selectedTask && isWorkTime) {
        // Start a new pomodoro session in the backend
        await startSession('WORK');
        onTaskStatusChange(selectedTask.id, 'in-progress');
      }
      
      setIsRunning(true);
      setShowSettings(false);
      timerRef.current = setInterval(tick, 1000);
    }
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTimeLeft(isWorkTime ? settings.workDuration : settings.restDuration);
  };

  const completeSelectedTask = async () => {
    if (selectedTask) {
      onTaskStatusChange(selectedTask.id, 'completed');
      
      // Complete the active pomodoro session if there is one
      if (activeSession) {
        await completeSession();
      }
      
      setSelectedTask(null);
      resetTimer();
    }
  };

  const tick = () => {
    setTimeLeft(prevTime => {
      if (prevTime <= 1) {
        // Timer completed
        const audio = new Audio('/notification.mp3');
        audio.play().catch(e => console.error('Error playing notification:', e));
        
        if (isWorkTime) {
          // Work session completed
          if (activeSession) {
            completeSession();
          }
          
          const newCycles = cycles + 1;
          setCycles(newCycles);
          
          if (newCycles >= settings.totalCycles) {
            // All cycles completed
            pauseTimer();
            setCycles(0);
            return settings.workDuration;
          } else {
            // Switch to rest time
            setIsWorkTime(false);
            return settings.restDuration;
          }
        } else {
          // Rest session completed, switch back to work time
          setIsWorkTime(true);
          return settings.workDuration;
        }
      }
      return prevTime - 1;
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeSpent = (sessions: any[]): string => {
    const totalMinutes = sessions.reduce((total, session) => {
      return total + (session.durationMinutes || 0);
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const updateSettings = (newSettings: Partial<PomodoroSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      if (!isRunning) {
        setTimeLeft(isWorkTime ? updated.workDuration : updated.restDuration);
      }
      return updated;
    });
  };

  const completeCurrentSession = async () => {
    if (selectedTask) {
      onTaskStatusChange(selectedTask.id, 'completed');
      
      // Complete the active pomodoro session if there is one
      if (activeSession) {
        await completeSession();
      }
      
      setSelectedTask(null);
      resetTimer();
    }
  };

  return (
    <div className={styles.pomodoroContainer}>
      <div className={styles.pomodoroCard}>
        <h2 className={styles.title}>{t('pomodoro.title')}</h2>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.timerDisplay}>
          <div className={styles.status}>
            {isRunning ? (isWorkTime ? t('pomodoro.workTime') : t('pomodoro.restTime')) : t('pomodoro.ready')}
          </div>
          <div className={styles.time}>{formatTime(timeLeft)}</div>
          <div className={styles.cycles}>
            {t('pomodoro.cycle')}: {cycles + 1}/{settings.totalCycles}
          </div>
        </div>
        
        <div className={styles.controls}>
          {!isRunning ? (
            <button 
              className={`${styles.button} ${styles.startButton}`}
              onClick={startTimer}
              disabled={!selectedTaskId}
            >
              {t('pomodoro.start')}
            </button>
          ) : (
            <button 
              className={`${styles.button} ${styles.pauseButton}`}
              onClick={pauseTimer}
            >
              {t('pomodoro.pause')}
            </button>
          )}
          
          <button 
            className={`${styles.button} ${styles.resetButton}`}
            onClick={resetTimer}
            disabled={isRunning}
          >
            {t('pomodoro.reset')}
          </button>
          
          <button 
            className={`${styles.button} ${styles.settingsButton}`}
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? t('pomodoro.hideSettings') : t('pomodoro.showSettings')}
          </button>
        </div>
        
        {showSettings && (
          <div className={styles.settingsPanel}>
            <h3>{t('pomodoro.settings')}</h3>
            <div className={styles.settingItem}>
              <label>{t('pomodoro.workDuration')}</label>
              <input 
                type="number" 
                min="1"
                max="60"
                value={settings.workDuration / 60}
                onChange={e => updateSettings({ workDuration: parseInt(e.target.value) * 60 })}
                disabled={isRunning}
              />
              <span>{t('pomodoro.minutes')}</span>
            </div>
            
            <div className={styles.settingItem}>
              <label>{t('pomodoro.restDuration')}</label>
              <input 
                type="number" 
                min="1"
                max="30"
                value={settings.restDuration / 60}
                onChange={e => updateSettings({ restDuration: parseInt(e.target.value) * 60 })}
                disabled={isRunning}
              />
              <span>{t('pomodoro.minutes')}</span>
            </div>
            
            <div className={styles.settingItem}>
              <label>{t('pomodoro.totalCycles')}</label>
              <input 
                type="number" 
                min="1"
                max="10"
                value={settings.totalCycles}
                onChange={e => updateSettings({ totalCycles: parseInt(e.target.value) })}
                disabled={isRunning}
              />
            </div>
            
            <div className={styles.settingItem}>
              <label>{t('pomodoro.longRestDuration')}</label>
              <input 
                type="number" 
                min="1"
                max="60"
                value={settings.longRestDuration / 60}
                onChange={e => updateSettings({ longRestDuration: parseInt(e.target.value) * 60 })}
                disabled={isRunning}
              />
              <span>{t('pomodoro.minutes')}</span>
            </div>
            
            <div className={styles.settingItem}>
              <label>{t('pomodoro.cyclesBeforeLongRest')}</label>
              <input 
                type="number" 
                min="1"
                max="10"
                value={settings.cyclesBeforeLongRest}
                onChange={e => updateSettings({ cyclesBeforeLongRest: parseInt(e.target.value) })}
                disabled={isRunning}
              />
            </div>
          </div>
        )}
        
        <div className={styles.taskSelection}>
          <h3>{t('pomodoro.selectTask')}</h3>
          {isLoading ? (
            <div className={styles.loading}>{t('common.loading')}</div>
          ) : (
            <>
              <select 
                value={selectedTaskId || ''}
                onChange={(e) => onSelectTask(e.target.value)}
                disabled={isRunning || isLoading}
              >
                <option value="">{t('pomodoro.selectTaskPlaceholder')}</option>
                {tasks
                  .filter(task => task.status !== 'completed')
                  .map(task => (
                    <option key={task.id} value={task.id}>
                      {task.title}
                    </option>
                  ))
                }
              </select>
              
              {selectedTask && (
                <div className={styles.selectedTaskInfo}>
                  <h4>{selectedTask.title}</h4>
                  {selectedTask.description && <p>{selectedTask.description}</p>}
                  <div className={styles.taskStats}>
                    <span className={styles.priority}>
                      {t(`priority.${selectedTask.priority}`)}
                    </span>
                    <span className={styles.timeSpent}>
                      {t('pomodoro.timeSpent')}: {formatTimeSpent(completedSessions)}
                    </span>
                  </div>
                  
                  {completedSessions.length > 0 && (
                    <div>
                      Completed sessions: {completedSessions.length}
                    </div>
                  )}
                  
                  {activeSession && !isRunning && (
                    <button 
                      className={styles.completeButton}
                      onClick={completeCurrentSession}
                    >
                      {t('pomodoro.completeTask')}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 