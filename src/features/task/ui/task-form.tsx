import { FC, FormEvent, useState } from 'react';
import { TaskFormData } from '../../../shared/types/task';
import styles from './task-form.module.css';

interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void;
}

export const TaskForm: FC<TaskFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      tags: [],
    });
    setTagInput('');
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput.trim()],
    }));
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles['task-form']}>
      <div className={styles['form-group']}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className={styles.input}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          className={styles.textarea}
          placeholder="Enter task description"
        />
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="priority" className={styles.label}>
          Priority
        </label>
        <select
          id="priority"
          value={formData.priority}
          onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value as TaskFormData['priority'] }))}
          className={styles.select}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="tags" className={styles.label}>
          Tags
        </label>
        <div className={styles['tags-input']}>
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className={styles.input}
            placeholder="Add tags"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className={styles['add-tag-button']}
          >
            Add Tag
          </button>
        </div>
        {formData.tags && formData.tags.length > 0 && (
          <div className={styles['tags-list']}>
            {formData.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className={styles['remove-tag']}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className={styles['submit-button']}>
        Add Task
      </button>
    </form>
  );
}; 