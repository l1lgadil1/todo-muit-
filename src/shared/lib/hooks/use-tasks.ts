import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '../../types/task';
import { createTask } from '../../../entities/task/model/task';
import {
  getStoredTasks,
  storeTask,
  updateStoredTask,
  deleteStoredTask,
  clearCompletedTasks,
  updateTasksOrder,
} from '../local-storage/task-storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = () => {
      const storedTasks = getStoredTasks();
      setTasks(storedTasks);
      setIsLoading(false);
    };

    loadTasks();
  }, []);

  const addTask = (formData: TaskFormData) => {
    const newTask = createTask(formData);
    storeTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, ...updates, updatedAt: new Date().toISOString() };
          updateStoredTask(updatedTask);
          return updatedTask;
        }
        return task;
      });
      return updatedTasks;
    });
  };

  const deleteTask = (taskId: string) => {
    deleteStoredTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const clearCompleted = () => {
    clearCompletedTasks();
    setTasks((prevTasks) => prevTasks.filter((task) => task.status !== 'completed'));
  };

  const reorderTasks = (reorderedTasks: Task[]) => {
    updateTasksOrder(reorderedTasks);
    setTasks(reorderedTasks);
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    clearCompleted,
    reorderTasks,
  };
}; 