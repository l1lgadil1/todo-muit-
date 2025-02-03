import { Task } from '../../../shared/types/task';

const TASKS_STORAGE_KEY = 'todo-list-tasks';

export const getStoredTasks = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error('Error reading tasks from localStorage:', error);
    return [];
  }
};

export const storeTask = (task: Task): void => {
  try {
    const tasks = getStoredTasks();
    const updatedTasks = [...tasks, task];
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  } catch (error) {
    console.error('Error storing task in localStorage:', error);
  }
};

export const updateStoredTask = (updatedTask: Task): void => {
  try {
    const tasks = getStoredTasks();
    const updatedTasks = tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    );
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  } catch (error) {
    console.error('Error updating task in localStorage:', error);
  }
};

export const deleteStoredTask = (taskId: string): void => {
  try {
    const tasks = getStoredTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  } catch (error) {
    console.error('Error deleting task from localStorage:', error);
  }
};

export const clearCompletedTasks = (): void => {
  try {
    const tasks = getStoredTasks();
    const updatedTasks = tasks.filter((task) => task.status !== 'completed');
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  } catch (error) {
    console.error('Error clearing completed tasks from localStorage:', error);
  }
};

export const updateTasksOrder = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error updating tasks order in localStorage:', error);
  }
}; 