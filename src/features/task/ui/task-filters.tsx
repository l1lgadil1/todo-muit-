import { FC } from 'react';
import { Task } from '../../../shared/types/task';
import styles from './task-filters.module.css';

interface TaskFilters {
  status?: Task['status'];
  search?: string;
  priority?: Task['priority'];
}

interface TaskFiltersProps {
  filters: TaskFilters;
  onFilterChange: (filters: TaskFilters) => void;
}

export const TaskFilters: FC<TaskFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search tasks..."
        value={filters.search || ''}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        className="search-input"
      />
      <select
        value={filters.status || ''}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as Task['status'] || undefined })}
        className="filter-select"
      >
        <option value="">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={filters.priority || ''}
        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as Task['priority'] || undefined })}
        className="filter-select"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}; 