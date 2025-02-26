package com.todoapp.repository;

import com.todoapp.model.PomodoroSession;
import com.todoapp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PomodoroSessionRepository extends JpaRepository<PomodoroSession, Long> {
    List<PomodoroSession> findByTaskOrderByStartTimeDesc(Task task);
    List<PomodoroSession> findByTaskAndStartTimeBetweenOrderByStartTimeDesc(
        Task task, LocalDateTime start, LocalDateTime end);
    List<PomodoroSession> findByCompletedTrueAndTaskOrderByStartTimeDesc(Task task);
} 