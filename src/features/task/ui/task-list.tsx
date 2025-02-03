import { FC } from 'react';
import { Task } from '../../../shared/types/task';
import { TaskItem } from '../../../entities/task/ui/task-item';
import styles from './task-list.module.css';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

export const TaskList: FC<TaskListProps> = ({ tasks, onStatusChange, onDelete }) => {
  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
      {tasks.length === 0 && (
        <p className="no-tasks">No tasks found. Add some tasks to get started!</p>
      )}
    </div>
  );
}; 