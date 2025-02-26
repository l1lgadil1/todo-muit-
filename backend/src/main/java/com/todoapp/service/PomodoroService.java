package com.todoapp.service;

import com.todoapp.dto.PomodoroSessionDTO;
import com.todoapp.model.PomodoroType;

import java.time.LocalDateTime;
import java.util.List;

public interface PomodoroService {
    PomodoroSessionDTO startSession(Long taskId, PomodoroType type);
    PomodoroSessionDTO completeSession(Long sessionId);
    List<PomodoroSessionDTO> getSessionsByTaskId(Long taskId);
    List<PomodoroSessionDTO> getSessionsByTaskAndDateRange(Long taskId, LocalDateTime start, LocalDateTime end);
    PomodoroSessionDTO getSessionById(Long sessionId);
    void deleteSession(Long sessionId);
} 