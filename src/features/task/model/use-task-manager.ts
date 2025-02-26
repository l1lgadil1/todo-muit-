import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '../../../shared/types/task';
import { createTask, filterTasks, sortTasks } from '../../../entities/task/model/task';
import { 
  fetchTasks, 
  createTaskApi, 
  updateTaskStatusApi, 
  deleteTaskApi 
} from '../../../shared/api/task-api';

export interface TaskFilters {
  status?: Task['status'];
  search?: string;
  priority?: Task['priority'];
}

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load from API
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const apiTasks = await fetchTasks();
        setTasks(apiTasks);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleCreateTask = async (formData: TaskFormData) => {
    try {
      setError(null);
      const newTask = await createTaskApi(formData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      console.error('Failed to create task:', err);
      setError('Failed to create task. Please try again later.');
    }
  };

  const handleStatusChange = async (taskId: string, status: Task['status']) => {
    try {
      setError(null);
      const updatedTask = await updateTaskStatusApi(taskId, status);
      
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask;
          }
          return task;
        })
      );
    } catch (err) {
      console.error('Failed to update task status:', err);
      setError('Failed to update task status. Please try again later.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      setError(null);
      await deleteTaskApi(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task. Please try again later.');
    }
  };

  const filteredTasks = filterTasks(tasks, filters);
  const sortedTasks = sortTasks(filteredTasks, 'createdAt');

  return {
    tasks: sortedTasks,
    filters,
    setFilters,
    handleCreateTask,
    handleStatusChange,
    handleDeleteTask,
    isLoading,
    error,
  };
}; 