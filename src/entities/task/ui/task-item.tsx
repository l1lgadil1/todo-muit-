import { FC } from 'react';
import { Task } from '../../../shared/types/task';
import styles from './task-item.module.css';

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem: FC<TaskItemProps> = ({ task, onStatusChange, onDelete }) => {
  const handleStatusChange = (status: Task['status']) => {
    onStatusChange(task.id, status);
  };

  const getStatusLabel = (status: Task['status']): string => {
    switch (status) {
      case 'todo':
        return '📝 To Do';
      case 'in-progress':
        return '🚀 In Progress';
      case 'completed':
        return '✅ Completed';
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority: Task['priority']): string => {
    switch (priority) {
      case 'low':
        return '🟢 Low';
      case 'medium':
        return '🟡 Medium';
      case 'high':
        return '🔴 High';
      default:
        return priority;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div 
      className={styles['task-item']} 
      data-priority={task.priority}
      data-status={task.status}
    >
      <div className={styles['task-content']}>
        <h3 className={styles['task-title']}>
          {task.title}
        </h3>
        {task.description && (
          <p className={styles['task-description']}>
            {task.description}
          </p>
        )}
        <div className={styles['task-meta']}>
          <span className={styles['task-priority']}>
            {getPriorityLabel(task.priority)}
          </span>
          {task.tags?.map((tag) => (
            <span key={tag} className={styles['task-tag']}>
              #{tag}
            </span>
          ))}
          <span className={styles['task-date']}>
            {formatDate(task.updatedAt)}
          </span>
        </div>
      </div>
      
      <div className={styles['task-actions']}>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
          className={styles['status-select']}
          data-status={task.status}
        >
          <option value="todo">{getStatusLabel('todo')}</option>
          <option value="in-progress">{getStatusLabel('in-progress')}</option>
          <option value="completed">{getStatusLabel('completed')}</option>
        </select>
        
        <button
          onClick={() => onDelete(task.id)}
          className={styles['delete-button']}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}; 