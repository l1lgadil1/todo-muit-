import React from 'react';
import { Task } from '../../../shared/types/task';
import { LanguageContext, LanguageContextType } from '../../../shared/i18n/language-context';
import styles from './pomodoro-timer.module.css';

interface TaskTimeTracking {
  taskId: string;
  totalSeconds: number;
  lastStartTime: number | null;
}

interface PomodoroSettings {
  workDuration: number;
  restDuration: number;
  totalCycles: number;
  showSettings: boolean;
}

interface PomodoroTimerState {
  timeLeft: number;
  isRunning: boolean;
  isWorkTime: boolean;
  workDuration: number;
  restDuration: number;
  cycles: number;
  totalCycles: number;
  showSettings: boolean;
  selectedTaskId: string | null;
  taskTimeTracking: Record<string, TaskTimeTracking>;
}

type PomodoroTimerProps = {
  onCycleComplete?: () => void;
  tasks?: Task[];
  onTaskStatusChange?: (taskId: string, status: Task['status']) => void;
};

const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25 * 60,
  restDuration: 5 * 60,
  totalCycles: 4,
  showSettings: false,
};

// Add proper type for context
declare module 'react' {
  interface ComponentClass {
    contextType?: React.Context<LanguageContextType>;
  }
}

export class PomodoroTimer extends React.Component<PomodoroTimerProps, PomodoroTimerState> {
  static contextType = LanguageContext;
  declare context: LanguageContextType;

  static defaultProps = {
    tasks: [],
    onTaskStatusChange: () => {},
  };

  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(props: PomodoroTimerProps) {
    super(props);
    const savedSettings = this.loadSettings();
    const savedTimeTracking = this.loadTimeTracking();
    
    this.state = {
      timeLeft: savedSettings.workDuration,
      isRunning: false,
      isWorkTime: true,
      workDuration: savedSettings.workDuration,
      restDuration: savedSettings.restDuration,
      cycles: 0,
      totalCycles: savedSettings.totalCycles,
      showSettings: savedSettings.showSettings,
      selectedTaskId: null,
      taskTimeTracking: savedTimeTracking,
    };
  }

  componentDidMount() {
    const savedProgress = localStorage.getItem('pomodoroProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        this.setState({
          timeLeft: progress.timeLeft,
          isWorkTime: progress.isWorkTime,
          cycles: progress.cycles,
          selectedTaskId: progress.selectedTaskId,
        });
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.saveProgress();
  }

  loadSettings = (): PomodoroSettings => {
    try {
      const savedSettings = localStorage.getItem('pomodoroSettings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
    return DEFAULT_SETTINGS;
  };

  saveSettings = (settings: Partial<PomodoroSettings>) => {
    try {
      const currentSettings = this.loadSettings();
      const newSettings = { ...currentSettings, ...settings };
      localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  saveProgress = () => {
    try {
      const progress = {
        timeLeft: this.state.timeLeft,
        isWorkTime: this.state.isWorkTime,
        cycles: this.state.cycles,
        selectedTaskId: this.state.selectedTaskId,
      };
      localStorage.setItem('pomodoroProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  loadTimeTracking = (): Record<string, TaskTimeTracking> => {
    try {
      const saved = localStorage.getItem('pomodoroTimeTracking');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading time tracking:', error);
    }
    return {};
  };

  saveTimeTracking = () => {
    try {
      localStorage.setItem('pomodoroTimeTracking', JSON.stringify(this.state.taskTimeTracking));
    } catch (error) {
      console.error('Error saving time tracking:', error);
    }
  };

  startTaskTracking = (taskId: string) => {
    this.setState(prevState => {
      const tracking = prevState.taskTimeTracking[taskId] || {
        taskId,
        totalSeconds: 0,
        lastStartTime: null,
      };

      return {
        taskTimeTracking: {
          ...prevState.taskTimeTracking,
          [taskId]: {
            ...tracking,
            lastStartTime: Date.now(),
          },
        },
      };
    });
  };

  stopTaskTracking = (taskId: string) => {
    this.setState((prevState: PomodoroTimerState) => {
      const tracking = prevState.taskTimeTracking[taskId];
      if (!tracking || tracking.lastStartTime === null) return prevState;

      const elapsedSeconds = Math.floor((Date.now() - tracking.lastStartTime) / 1000);
      
      return {
        ...prevState,
        taskTimeTracking: {
          ...prevState.taskTimeTracking,
          [taskId]: {
            ...tracking,
            totalSeconds: tracking.totalSeconds + elapsedSeconds,
            lastStartTime: null,
          },
        },
      };
    }, this.saveTimeTracking);
  };

  formatTimeSpent = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  handleTaskSelect = (taskId: string | null) => {
    const { selectedTaskId } = this.state;
    if (selectedTaskId) {
      this.stopTaskTracking(selectedTaskId);
    }
    this.setState({ selectedTaskId: taskId }, this.saveProgress);
  };

  startTimer = () => {
    if (!this.timer) {
      const { selectedTaskId } = this.state;
      this.setState({ isRunning: true, showSettings: false });
      this.saveSettings({ showSettings: false });
      this.timer = setInterval(this.tick, 1000);

      if (selectedTaskId) {
        this.props.onTaskStatusChange?.(selectedTaskId, 'in-progress');
        this.startTaskTracking(selectedTaskId);
      }
    }
  };

  pauseTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      const { selectedTaskId } = this.state;
      if (selectedTaskId) {
        this.stopTaskTracking(selectedTaskId);
      }
      this.setState({ isRunning: false });
      this.saveProgress();
    }
  };

  resetTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState((prevState) => ({
      timeLeft: prevState.isWorkTime ? prevState.workDuration : prevState.restDuration,
      isRunning: false,
      cycles: 0,
    }));
    this.saveProgress();
  };

  completeSelectedTask = () => {
    const { selectedTaskId } = this.state;
    const { onTaskStatusChange } = this.props;
    if (selectedTaskId && onTaskStatusChange) {
      onTaskStatusChange(selectedTaskId, 'completed');
      this.setState({ selectedTaskId: null });
    }
  };

  tick = () => {
    this.setState((prevState) => {
      if (prevState.timeLeft <= 0) {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }

        const audio = new Audio('/notification.mp3');
        audio.play().catch(console.error);

        const newCycles = prevState.isWorkTime ? prevState.cycles + 1 : prevState.cycles;
        
        if (this.props.onCycleComplete && prevState.isWorkTime) {
          this.props.onCycleComplete();
        }

        // If work session is complete, mark task as completed
        if (prevState.isWorkTime && newCycles === prevState.totalCycles) {
          this.completeSelectedTask();
        }
        
        const updates = {
          isWorkTime: !prevState.isWorkTime,
          timeLeft: !prevState.isWorkTime ? prevState.workDuration : prevState.restDuration,
          isRunning: false,
          cycles: newCycles,
        };

        this.saveProgress();
        return updates;
      }
      return { ...prevState, timeLeft: prevState.timeLeft - 1 };
    });
  };

  formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  render() {
    const { 
      timeLeft, 
      isRunning, 
      isWorkTime, 
      cycles, 
      totalCycles, 
      workDuration,
      restDuration,
      showSettings,
      selectedTaskId,
      taskTimeTracking
    } = this.state;

    const { tasks = [] } = this.props;
    const selectedTask = selectedTaskId ? tasks.find(task => task.id === selectedTaskId) : null;
    const availableTasks = tasks.filter(task => task.status !== 'completed');

    // Get translation function from context using a static context type
    const { t } = this.context;

    return (
      <div className={styles['pomodoro-timer']}>
        <div className={isWorkTime ? styles['work-mode'] : styles['rest-mode']}>
          <span className={styles['mode-indicator']}>
            {isWorkTime ? t('pomodoro.workTime') : t('pomodoro.breakTime')}
          </span>
        </div>

        <h2 className={styles.title}>
          {t('pomodoro.title')}
          <div className={styles.cycles}>
            {t('pomodoro.cycle')} {cycles}/{totalCycles}
          </div>
        </h2>
        
        <div className={styles['task-selection']}>
          <select
            value={selectedTaskId || ''}
            onChange={(e) => this.handleTaskSelect(e.target.value || null)}
            className={styles['task-select']}
            disabled={isRunning}
          >
            <option value="">{t('pomodoro.selectTask')}</option>
            {availableTasks.map(task => {
              const timeSpent = taskTimeTracking[task.id]?.totalSeconds || 0;
              return (
                <option key={task.id} value={task.id}>
                  {task.title} ({this.formatTimeSpent(timeSpent)})
                </option>
              );
            })}
          </select>

          {selectedTask && (
            <div className={styles['selected-task']}>
              <div>{t('pomodoro.currentTask')}: {selectedTask.title}</div>
              <div className={styles['time-spent']}>
                {t('pomodoro.timeSpent')}: {this.formatTimeSpent(taskTimeTracking[selectedTask.id]?.totalSeconds || 0)}
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.display}>
          {this.formatTime(timeLeft)}
        </div>
        
        <div className={styles.controls}>
          {!isRunning ? (
            <button
              onClick={this.startTimer}
              className={`${styles.button} ${styles.start}`}
            >
              {t('pomodoro.start')}
            </button>
          ) : (
            <button
              onClick={this.pauseTimer}
              className={`${styles.button} ${styles.pause}`}
            >
              {t('pomodoro.pause')}
            </button>
          )}
          
          <button
            onClick={this.resetTimer}
            className={`${styles.button} ${styles.reset}`}
          >
            {t('pomodoro.reset')}
          </button>
          
          <button
            onClick={() => this.setState(
              (prevState) => ({
                isWorkTime: !prevState.isWorkTime,
                timeLeft: !prevState.isWorkTime ? prevState.workDuration : prevState.restDuration,
                isRunning: false,
              }),
              () => {
                if (this.timer) {
                  clearInterval(this.timer);
                  this.timer = null;
                }
                this.saveProgress();
              }
            )}
            className={`${styles.button} ${styles.switch}`}
          >
            {isWorkTime ? t('pomodoro.switchToBreak') : t('pomodoro.switchToWork')}
          </button>

          <button
            onClick={() => this.setState(
              (prevState) => ({ showSettings: !prevState.showSettings }),
              () => {
                this.saveSettings({ showSettings: this.state.showSettings });
              }
            )}
            className={`${styles.button} ${styles.switch}`}
          >
            {showSettings ? t('pomodoro.hideSettings') : t('pomodoro.showSettings')}
          </button>
        </div>
        
        {showSettings && (
          <div className={styles.settings}>
            <div className={styles['settings-title']}>{t('pomodoro.settings.title')}</div>
            <div className={styles['settings-group']}>
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>{t('pomodoro.settings.workDuration')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={Math.floor(workDuration / 60)}
                  onChange={(e) => {
                    const value = Math.max(1, Math.min(60, Number(e.target.value) || 1));
                    const seconds = value * 60;
                    this.setState((prevState) => {
                      const updates: Partial<PomodoroTimerState> = {
                        workDuration: seconds,
                      };
                      if (prevState.isWorkTime) {
                        updates.timeLeft = seconds;
                      }
                      return updates as PomodoroTimerState;
                    });
                    this.saveSettings({ workDuration: seconds });
                  }}
                  min="1"
                  max="60"
                />
              </div>
              <div className={styles['input-group']}>
                <label className={styles['input-label']}>{t('pomodoro.settings.breakDuration')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={Math.floor(restDuration / 60)}
                  onChange={(e) => {
                    const value = Math.max(1, Math.min(60, Number(e.target.value) || 1));
                    const seconds = value * 60;
                    this.setState((prevState) => {
                      const updates: Partial<PomodoroTimerState> = {
                        restDuration: seconds,
                      };
                      if (!prevState.isWorkTime) {
                        updates.timeLeft = seconds;
                      }
                      return updates as PomodoroTimerState;
                    });
                    this.saveSettings({ restDuration: seconds });
                  }}
                  min="1"
                  max="60"
                />
              </div>
            </div>
            <div className={styles['input-group']}>
              <label className={styles['input-label']}>{t('pomodoro.settings.totalCycles')}</label>
              <input
                type="number"
                className={styles.input}
                value={totalCycles}
                onChange={(e) => {
                  const value = Math.max(1, Math.min(10, Number(e.target.value) || 1));
                  this.setState({ totalCycles: value });
                  this.saveSettings({ totalCycles: value });
                }}
                min="1"
                max="10"
              />
            </div>
          </div>
        )}
        
        <div className={styles.progress}>
          <div
            className={styles['progress-bar']}
            style={{
              width: `${(timeLeft / (isWorkTime ? workDuration : restDuration)) * 100}%`,
            }}
          />
        </div>
      </div>
    );
  }
} 