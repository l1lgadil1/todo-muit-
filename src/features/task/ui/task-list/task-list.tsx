import React from 'react';
import { Task } from '../../../../shared/types/task';
import styles from './task-list.module.css';

interface TaskListProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, status: Task['status']) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskEdit: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskStatusChange,
  onTaskDelete,
  onTaskEdit,
}) => {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📝</div>
        <h3 className={styles.emptyStateTitle}>No tasks yet</h3>
        <p className={styles.emptyStateDescription}>
          Create your first task to get started
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStatusClass = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return styles.statusTodo;
      case 'in-progress':
        return styles.statusInProgress;
      case 'completed':
        return styles.statusCompleted;
      default:
        return styles.statusTodo;
    }
  };

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`${styles.taskItem} ${
            task.status === 'completed' ? styles.completedTask : ''
          }`}
        >
          <div className={styles.taskHeader}>
            <h3 className={styles.taskTitle}>{task.title}</h3>
            <div className={styles.taskStatus}>
              <span className={getStatusClass(task.status)}>
                {task.status === 'todo'
                  ? 'To Do'
                  : task.status === 'in-progress'
                  ? 'In Progress'
                  : 'Completed'}
              </span>
            </div>
          </div>

          {task.description && (
            <p className={styles.taskDescription}>{task.description}</p>
          )}

          <div className={styles.taskMeta}>
            <div className={styles.taskDate}>
              <span>Created: {formatDate(task.createdAt)}</span>
            </div>
          </div>

          <div className={styles.taskActions}>
            {task.status !== 'completed' && (
              <button
                className={`${styles.actionButton} ${styles.completeButton}`}
                onClick={() => onTaskStatusChange(task.id, 'completed')}
              >
                Complete
              </button>
            )}
            {task.status === 'todo' && (
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => onTaskStatusChange(task.id, 'in-progress')}
              >
                Start
              </button>
            )}
            <button
              className={`${styles.actionButton} ${styles.editButton}`}
              onClick={() => onTaskEdit(task)}
            >
              Edit
            </button>
            <button
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={() => onTaskDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList; 