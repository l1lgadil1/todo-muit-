import axios from 'axios';
import { Task, TaskFormData, TaskStatus } from '../types/task';

// Define the API base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Define the task API endpoints
const TASKS_ENDPOINT = `${API_BASE_URL}/tasks`;

// Define the task DTO interface to match the backend
export interface TaskDTO {
  id?: number;
  title: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
  estimatedPomodoros?: number;
  completedPomodoros?: number;
  priority?: string;
}

// Convert frontend Task to backend TaskDTO
const toTaskDTO = (task: Task | TaskFormData): TaskDTO => {
  return {
    id: 'id' in task ? Number((task as Task).id) : undefined,
    title: task.title,
    description: task.description,
    status: 'status' in task ? mapStatusToBackend((task as Task).status) : 'TODO',
    priority: task.priority.toUpperCase(),
    estimatedPomodoros: 1, // Default value
  };
};

// Convert backend TaskDTO to frontend Task
const fromTaskDTO = (taskDTO: TaskDTO): Task => {
  return {
    id: String(taskDTO.id),
    title: taskDTO.title,
    description: taskDTO.description,
    status: mapStatusFromBackend(taskDTO.status || 'TODO'),
    createdAt: taskDTO.createdAt || new Date().toISOString(),
    updatedAt: taskDTO.updatedAt || new Date().toISOString(),
    priority: (taskDTO.priority?.toLowerCase() as Task['priority']) || 'medium',
    estimatedPomodoros: taskDTO.estimatedPomodoros || 1,
    completedPomodoros: taskDTO.completedPomodoros || 0,
  };
};

// Map frontend status to backend status
const mapStatusToBackend = (status: TaskStatus): string => {
  const statusMap: Record<TaskStatus, string> = {
    'todo': 'TODO',
    'in-progress': 'IN_PROGRESS',
    'completed': 'COMPLETED'
  };
  return statusMap[status];
};

// Map backend status to frontend status
const mapStatusFromBackend = (status: string): TaskStatus => {
  const statusMap: Record<string, TaskStatus> = {
    'TODO': 'todo',
    'IN_PROGRESS': 'in-progress',
    'COMPLETED': 'completed'
  };
  return statusMap[status] || 'todo';
};

// API functions
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<TaskDTO[]>(TASKS_ENDPOINT);
    return response.data.map(fromTaskDTO);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await axios.get<TaskDTO>(`${TASKS_ENDPOINT}/${id}`);
    return fromTaskDTO(response.data);
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};

export const createTaskApi = async (taskData: TaskFormData): Promise<Task> => {
  try {
    const response = await axios.post<TaskDTO>(TASKS_ENDPOINT, toTaskDTO(taskData));
    return fromTaskDTO(response.data);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTaskApi = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  try {
    const response = await axios.put<TaskDTO>(`${TASKS_ENDPOINT}/${id}`, toTaskDTO({
      ...taskData,
      id: id
    } as Task));
    return fromTaskDTO(response.data);
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw error;
  }
};

export const updateTaskStatusApi = async (id: string, status: TaskStatus): Promise<Task> => {
  try {
    const response = await axios.patch<TaskDTO>(
      `${TASKS_ENDPOINT}/${id}/status?status=${mapStatusToBackend(status)}`
    );
    return fromTaskDTO(response.data);
  } catch (error) {
    console.error(`Error updating status for task with id ${id}:`, error);
    throw error;
  }
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${TASKS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw error;
  }
}; 