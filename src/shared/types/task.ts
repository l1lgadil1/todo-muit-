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
  estimatedPomodoros?: number;
  completedPomodoros?: number;
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: Task['priority'];
  tags?: string[];
  estimatedPomodoros?: number;
} 