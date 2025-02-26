import axios from 'axios';

// Define the API base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Define the pomodoro API endpoints
const POMODOROS_ENDPOINT = `${API_BASE_URL}/pomodoros`;

// Define the pomodoro session DTO interface to match the backend
export interface PomodoroSessionDTO {
  id?: number;
  taskId: number;
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
  type: 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK';
  completed?: boolean;
}

// Frontend PomodoroSession interface
export interface PomodoroSession {
  id: string;
  taskId: string;
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  type: 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK';
  completed: boolean;
}

// Convert backend PomodoroSessionDTO to frontend PomodoroSession
const fromPomodoroDTO = (dto: PomodoroSessionDTO): PomodoroSession => {
  return {
    id: String(dto.id),
    taskId: String(dto.taskId),
    startTime: dto.startTime || new Date().toISOString(),
    endTime: dto.endTime,
    durationMinutes: dto.durationMinutes || 25,
    type: dto.type,
    completed: dto.completed || false
  };
};

// API functions
export const startPomodoroSession = async (
  taskId: string, 
  type: 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK'
): Promise<PomodoroSession> => {
  try {
    const response = await axios.post<PomodoroSessionDTO>(
      `${POMODOROS_ENDPOINT}/tasks/${taskId}/start?type=${type}`
    );
    return fromPomodoroDTO(response.data);
  } catch (error) {
    console.error('Error starting pomodoro session:', error);
    throw error;
  }
};

export const completePomodoroSession = async (sessionId: string): Promise<PomodoroSession> => {
  try {
    const response = await axios.post<PomodoroSessionDTO>(
      `${POMODOROS_ENDPOINT}/${sessionId}/complete`
    );
    return fromPomodoroDTO(response.data);
  } catch (error) {
    console.error(`Error completing pomodoro session with id ${sessionId}:`, error);
    throw error;
  }
};

export const getSessionsByTaskId = async (taskId: string): Promise<PomodoroSession[]> => {
  try {
    const response = await axios.get<PomodoroSessionDTO[]>(
      `${POMODOROS_ENDPOINT}/tasks/${taskId}`
    );
    return response.data.map(fromPomodoroDTO);
  } catch (error) {
    console.error(`Error fetching pomodoro sessions for task with id ${taskId}:`, error);
    throw error;
  }
};

export const getSessionById = async (sessionId: string): Promise<PomodoroSession> => {
  try {
    const response = await axios.get<PomodoroSessionDTO>(
      `${POMODOROS_ENDPOINT}/${sessionId}`
    );
    return fromPomodoroDTO(response.data);
  } catch (error) {
    console.error(`Error fetching pomodoro session with id ${sessionId}:`, error);
    throw error;
  }
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  try {
    await axios.delete(`${POMODOROS_ENDPOINT}/${sessionId}`);
  } catch (error) {
    console.error(`Error deleting pomodoro session with id ${sessionId}:`, error);
    throw error;
  }
}; 