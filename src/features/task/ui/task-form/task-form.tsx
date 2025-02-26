import React, { useState, useEffect } from 'react';
import { Task } from '../../../../shared/types/task';
import styles from './task-form.module.css';

type Priority = 'low' | 'medium' | 'high';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  initialTask?: Task;
  onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialTask,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setPriority((initialTask.priority as Priority) || 'medium');
    }
  }, [initialTask]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status: initialTask?.status || 'todo',
      updatedAt: new Date().toISOString(),
    });

    if (!initialTask) {
      // Reset form if it's a new task
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        {initialTask ? 'Edit Task' : 'Create New Task'}
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title *
          </label>
          <input
            id="title"
            type="text"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
          {errors.title && <div className={styles.error}>{errors.title}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="priority" className={styles.label}>
            Priority
          </label>
          <select
            id="priority"
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className={styles.formActions}>
          {onCancel && (
            <button
              type="button"
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            {initialTask ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm; 