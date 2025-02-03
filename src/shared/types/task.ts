export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: Task['priority'];
  tags?: string[];
} 