package com.todoapp.service;

import com.todoapp.dto.TaskDTO;
import com.todoapp.model.TaskStatus;

import java.util.List;

public interface TaskService {
    List<TaskDTO> getAllTasks();
    List<TaskDTO> getTasksByStatus(TaskStatus status);
    TaskDTO getTaskById(Long id);
    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO updateTask(Long id, TaskDTO taskDTO);
    TaskDTO updateTaskStatus(Long id, TaskStatus status);
    void deleteTask(Long id);
} 