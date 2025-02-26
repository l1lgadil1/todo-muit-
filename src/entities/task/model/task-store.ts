import { create } from 'zustand';
import { Task, taskApi } from '@/shared/api/task-api';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (title: string, description: string) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    try {
      set({ isLoading: true, error: null });
      const tasks = await taskApi.getAllTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
    }
  },

  createTask: async (title: string, description: string) => {
    try {
      set({ isLoading: true, error: null });
      const newTask = await taskApi.createTask({ title, description });
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create task', isLoading: false });
    }
  },

  updateTask: async (id: number, updates: Partial<Task>) => {
    try {
      set({ isLoading: true, error: null });
      const updatedTask = await taskApi.updateTask(id, updates);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false });
    }
  },

  deleteTask: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      await taskApi.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete task', isLoading: false });
    }
  },
})); 