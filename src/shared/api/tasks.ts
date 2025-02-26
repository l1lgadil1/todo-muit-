import { Task } from '../types/task';

const API_URL = 'http://localhost:8080/api';

export const TaskApi = {
  async getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`);
    return response.json();
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    return response.json();
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  async updateTask(id: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  async deleteTask(id: string): Promise<void> {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  async searchTasks(query: string): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks/search?query=${encodeURIComponent(query)}`);
    return response.json();
  },

  async getTasksByStatus(status: Task['status']): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks/status/${status}`);
    return response.json();
  },

  async updateTaskPositions(tasks: Task[]): Promise<void> {
    await fetch(`${API_URL}/tasks/positions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tasks),
    });
  },
}; 