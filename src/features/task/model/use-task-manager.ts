import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '../../../shared/types/task';
import { createTask, filterTasks, sortTasks } from '../../../entities/task/model/task';
import { 
  getStoredTasks, 
  storeTask, 
  updateStoredTask, 
  deleteStoredTask 
} from '../../../shared/lib/local-storage/task-storage';

export interface TaskFilters {
  status?: Task['status'];
  search?: string;
  priority?: Task['priority'];
}

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  // Initial load from localStorage
  useEffect(() => {
    const loadTasks = () => {
      const storedTasks = getStoredTasks();
      setTasks(storedTasks);
      setIsLoading(false);
    };

    loadTasks();
  }, []);

  const handleCreateTask = (formData: TaskFormData) => {
    const newTask = createTask(formData);
    storeTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, status, updatedAt: new Date().toISOString() };
          updateStoredTask(updatedTask);
          return updatedTask;
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    deleteStoredTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
  };
}; 