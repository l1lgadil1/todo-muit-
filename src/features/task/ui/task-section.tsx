import { FC, useState } from 'react';
import { Task, TaskFormData } from '../../../shared/types/task';
import { TaskList } from './task-list';
import { TaskFilters } from './task-filters';
import { Modal } from '../../../shared/ui/modal/modal';
import { TaskForm } from './task-form';

interface TaskFiltersState {
  status?: Task['status'];
  search?: string;
  priority?: Task['priority'];
}

interface TaskSectionProps {
  tasks: Task[];
  filters: TaskFiltersState;
  onFilterChange: (filters: TaskFiltersState) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
  onCreateTask: (formData: TaskFormData) => void;
}

export const TaskSection: FC<TaskSectionProps> = ({
  tasks,
  filters,
  onFilterChange,
  onStatusChange,
  onDelete,
  onCreateTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = (formData: TaskFormData) => {
    onCreateTask(formData);
    setIsModalOpen(false);
  };

  return (
    <section className="section tasks-section">
      <div className="section-header">
        <h2>Tasks</h2>
        <button
          className="add-task-button"
          onClick={() => setIsModalOpen(true)}
        >
          Add Task
        </button>
      </div>

      <TaskFilters
        filters={filters}
        onFilterChange={onFilterChange}
      />

      <TaskList
        tasks={tasks}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Task"
      >
        <TaskForm onSubmit={handleCreateTask} />
      </Modal>
    </section>
  );
}; 