import React, { useState } from 'react';
import { Task } from '../../../../shared/types/task';
import styles from './task-filter.module.css';

type FilterStatus = 'all' | 'todo' | 'in-progress' | 'completed';
type FilterPriority = 'all' | 'low' | 'medium' | 'high';

interface TaskFilterProps {
  onFilterChange: (filters: TaskFilters) => void;
}

export interface TaskFilters {
  status: FilterStatus;
  priority: FilterPriority;
  search: string;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    priority: 'all',
    search: '',
  });

  const handleFilterChange = (
    key: keyof TaskFilters,
    value: string
  ) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      status: 'all' as FilterStatus,
      priority: 'all' as FilterPriority,
      search: '',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>
        <span className={styles.filterIcon}>🔍</span>
        Filter Tasks
      </h3>
      
      <div className={styles.filterForm}>
        <div className={styles.filterGroup}>
          <label htmlFor="status-filter" className={styles.filterLabel}>
            Status
          </label>
          <select
            id="status-filter"
            className={styles.filterSelect}
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value as FilterStatus)}
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="priority-filter" className={styles.filterLabel}>
            Priority
          </label>
          <select
            id="priority-filter"
            className={styles.filterSelect}
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value as FilterPriority)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="search-filter" className={styles.filterLabel}>
            Search
          </label>
          <input
            id="search-filter"
            type="text"
            className={styles.filterInput}
            placeholder="Search by title or description"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
      </div>
      
      {(filters.status !== 'all' || filters.priority !== 'all' || filters.search) && (
        <div className={styles.filterActions}>
          <button
            className={`${styles.filterButton} ${styles.secondaryButton}`}
            onClick={handleReset}
          >
            Reset Filters
          </button>
        </div>
      )}
      
      {(filters.status !== 'all' || filters.priority !== 'all' || filters.search) && (
        <div className={styles.filterBadges}>
          {filters.status !== 'all' && (
            <div className={styles.filterBadge}>
              Status: {filters.status === 'todo' ? 'To Do' : filters.status === 'in-progress' ? 'In Progress' : 'Completed'}
              <button
                className={styles.removeFilter}
                onClick={() => handleFilterChange('status', 'all')}
                aria-label="Remove status filter"
              >
                ✕
              </button>
            </div>
          )}
          
          {filters.priority !== 'all' && (
            <div className={styles.filterBadge}>
              Priority: {filters.priority.charAt(0).toUpperCase() + filters.priority.slice(1)}
              <button
                className={styles.removeFilter}
                onClick={() => handleFilterChange('priority', 'all')}
                aria-label="Remove priority filter"
              >
                ✕
              </button>
            </div>
          )}
          
          {filters.search && (
            <div className={styles.filterBadge}>
              Search: {filters.search}
              <button
                className={styles.removeFilter}
                onClick={() => handleFilterChange('search', '')}
                aria-label="Remove search filter"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskFilter; 