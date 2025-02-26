package com.todoapp.service.impl;

import com.todoapp.dto.TaskDTO;
import com.todoapp.model.Task;
import com.todoapp.model.TaskStatus;
import com.todoapp.repository.TaskRepository;
import com.todoapp.service.TaskService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO getTaskById(Long id) {
        return taskRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = mapToEntity(taskDTO);
        task = taskRepository.save(task);
        return mapToDTO(task);
    }

    @Override
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
        
        updateTaskFromDTO(task, taskDTO);
        task = taskRepository.save(task);
        return mapToDTO(task);
    }

    @Override
    public TaskDTO updateTaskStatus(Long id, TaskStatus status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
        
        task.setStatus(status);
        task = taskRepository.save(task);
        return mapToDTO(task);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new EntityNotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }

    private TaskDTO mapToDTO(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .completedAt(task.getCompletedAt())
                .estimatedPomodoros(task.getEstimatedPomodoros())
                .completedPomodoros(task.getCompletedPomodoros())
                .build();
    }

    private Task mapToEntity(TaskDTO dto) {
        return Task.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .status(dto.getStatus())
                .estimatedPomodoros(dto.getEstimatedPomodoros())
                .completedPomodoros(dto.getCompletedPomodoros())
                .build();
    }

    private void updateTaskFromDTO(Task task, TaskDTO dto) {
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setEstimatedPomodoros(dto.getEstimatedPomodoros());
        task.setCompletedPomodoros(dto.getCompletedPomodoros());
    }
} 