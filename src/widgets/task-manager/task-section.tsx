import React from 'react';
import { Task } from '../../shared/types/task';
import { useTranslation } from '../../shared/i18n/language-context';
import styles from './task-section.module.css';

interface TaskSectionProps {
  tasks: Task[];
  filters: {
    status: string;
    search: string;
  };
  onFilterChange: (filters: { status: string; search: string }) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
  onCreateTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedPomodoros'>) => void;
}

export function TaskSection({
  tasks,
  filters,
  onFilterChange,
  onStatusChange,
  onDelete,
  onCreateTask,
}: TaskSectionProps) {
  const { t } = useTranslation();
  const [showForm, setShowForm] = React.useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = !filters.status || filters.status === 'all' || task.status === filters.status;
    const matchesSearch = !filters.search || 
      task.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description?.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <section className={styles['task-section']}>
      <div className={styles.header}>
        <h2>{t('tasks.title')}</h2>
        <button
          className={styles['add-button']}
          onClick={() => setShowForm(true)}
        >
          {t('tasks.addTask')}
        </button>
      </div>

      <div className={styles.filters}>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className={styles.select}
        >
          <option value="all">{t('tasks.filters.all')}</option>
          <option value="todo">{t('tasks.status.todo')}</option>
          <option value="in-progress">{t('tasks.status.inProgress')}</option>
          <option value="completed">{t('tasks.status.completed')}</option>
        </select>

        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          placeholder={t('tasks.filters.search')}
          className={styles.search}
        />
      </div>

      {filteredTasks.length === 0 ? (
        <p className={styles['no-tasks']}>{t('tasks.noTasks')}</p>
      ) : (
        <div className={styles['task-list']}>
          {filteredTasks.map((task) => (
            <div key={task.id} className={styles['task-item']}>
              <div className={styles['task-content']}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className={styles.meta}>
                  <span className={styles.priority}>
                    {t(`tasks.form.priority.${task.priority.toLowerCase()}`)}
                  </span>
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
                    className={styles.status}
                  >
                    <option value="todo">{t('tasks.status.todo')}</option>
                    <option value="in-progress">{t('tasks.status.inProgress')}</option>
                    <option value="completed">{t('tasks.status.completed')}</option>
                  </select>
                  <button
                    onClick={() => onDelete(task.id)}
                    className={styles.delete}
                  >
                    {t('tasks.actions.delete')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <h3>{t('tasks.addTask')}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onCreateTask({
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  priority: (formData.get('priority') as Task['priority']) || 'medium',
                  status: 'todo',
                  tags: formData.get('tags') as string
                    ? (formData.get('tags') as string).split(',').map((tag) => tag.trim())
                    : [],
                  estimatedPomodoros: Number(formData.get('estimatedPomodoros')) || 1,
                });
                setShowForm(false);
              }}
            >
              <div className={styles['form-group']}>
                <label>{t('tasks.form.title')}</label>
                <input type="text" name="title" required />
              </div>
              <div className={styles['form-group']}>
                <label>{t('tasks.form.description')}</label>
                <textarea name="description" required />
              </div>
              <div className={styles['form-group']}>
                <label>{t('tasks.form.priority.label')}</label>
                <select name="priority" required>
                  <option value="low">{t('tasks.form.priority.low')}</option>
                  <option value="medium" selected>{t('tasks.form.priority.medium')}</option>
                  <option value="high">{t('tasks.form.priority.high')}</option>
                </select>
              </div>
              <div className={styles['form-group']}>
                <label>{t('tasks.form.tags')}</label>
                <input type="text" name="tags" placeholder={t('tasks.form.tagsPlaceholder')} />
              </div>
              <div className={styles['form-group']}>
                <label>{t('tasks.form.estimatedPomodoros')}</label>
                <input type="number" name="estimatedPomodoros" min="1" defaultValue="1" />
              </div>
              <div className={styles['form-actions']}>
                <button type="submit">{t('tasks.form.submit')}</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  {t('tasks.form.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
} 