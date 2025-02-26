import { Task, TaskFormData } from '../../../shared/types/task';

export const createTask = (formData: TaskFormData): Task => {
  const now = new Date().toISOString();
  
  return {
    id: crypto.randomUUID(),
    title: formData.title,
    description: formData.description,
    status: 'todo',
    createdAt: now,
    updatedAt: now,
    priority: formData.priority,
    tags: formData.tags,
  };
};

export const updateTask = (task: Task, updates: Partial<Task>): Task => {
  return {
    ...task,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
};

export const isTaskCompleted = (task: Task): boolean => {
  return task.status === 'completed';
};

export const isTaskInProgress = (task: Task): boolean => {
  return task.status === 'in-progress';
};

export const filterTasks = (
  tasks: Task[],
  filters: {
    status?: Task['status'] | 'all';
    search?: string;
    priority?: Task['priority'];
  }
): Task[] => {
  return tasks.filter((task) => {
    const matchesStatus = !filters.status || filters.status === 'all' || task.status === filters.status;
    const matchesSearch = !filters.search || 
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesPriority = !filters.priority || task.priority === filters.priority;

    return matchesStatus && matchesSearch && matchesPriority;
  });
};

export const sortTasks = (tasks: Task[], sortBy: 'createdAt' | 'priority'): Task[] => {
  return [...tasks].sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    
    const priorityWeight = { low: 0, medium: 1, high: 2 };
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  });
}; 