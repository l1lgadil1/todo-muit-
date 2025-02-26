package com.todoapp.repository;

import com.todoapp.model.Task;
import com.todoapp.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(TaskStatus status);
    List<Task> findAllByOrderByCreatedAtDesc();
} 