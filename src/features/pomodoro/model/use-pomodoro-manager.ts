import { useState, useEffect } from 'react';
import { 
  PomodoroSession, 
  startPomodoroSession, 
  completePomodoroSession, 
  getSessionsByTaskId 
} from '../../../shared/api/pomodoro-api';
import { Task } from '../../../shared/types/task';

export interface PomodoroState {
  activeSession: PomodoroSession | null;
  completedSessions: PomodoroSession[];
  isLoading: boolean;
  error: string | null;
}

export const usePomodoroManager = (selectedTask: Task | null) => {
  const [state, setState] = useState<PomodoroState>({
    activeSession: null,
    completedSessions: [],
    isLoading: false,
    error: null,
  });

  // Load completed sessions for the selected task
  useEffect(() => {
    if (!selectedTask) return;

    const loadSessions = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        const sessions = await getSessionsByTaskId(selectedTask.id);
        const completed = sessions.filter(session => session.completed);
        const active = sessions.find(session => !session.completed) || null;
        
        setState({
          activeSession: active,
          completedSessions: completed,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        console.error('Failed to load pomodoro sessions:', err);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load pomodoro sessions. Please try again later.',
        }));
      }
    };

    loadSessions();
  }, [selectedTask]);

  const startSession = async (type: 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK' = 'WORK') => {
    if (!selectedTask) {
      setState(prev => ({
        ...prev,
        error: 'Please select a task to start a pomodoro session.',
      }));
      return null;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const session = await startPomodoroSession(selectedTask.id, type);
      setState(prev => ({
        ...prev,
        activeSession: session,
        isLoading: false,
      }));
      return session;
    } catch (err) {
      console.error('Failed to start pomodoro session:', err);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to start pomodoro session. Please try again later.',
      }));
      return null;
    }
  };

  const completeSession = async () => {
    if (!state.activeSession) {
      setState(prev => ({
        ...prev,
        error: 'No active pomodoro session to complete.',
      }));
      return null;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const completedSession = await completePomodoroSession(state.activeSession.id);
      setState(prev => ({
        ...prev,
        activeSession: null,
        completedSessions: [...prev.completedSessions, completedSession],
        isLoading: false,
      }));
      return completedSession;
    } catch (err) {
      console.error('Failed to complete pomodoro session:', err);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to complete pomodoro session. Please try again later.',
      }));
      return null;
    }
  };

  return {
    ...state,
    startSession,
    completeSession,
  };
}; 