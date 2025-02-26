package com.todoapp.service.impl;

import com.todoapp.dto.PomodoroSessionDTO;
import com.todoapp.model.PomodoroSession;
import com.todoapp.model.PomodoroType;
import com.todoapp.model.Task;
import com.todoapp.repository.PomodoroSessionRepository;
import com.todoapp.repository.TaskRepository;
import com.todoapp.service.PomodoroService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PomodoroServiceImpl implements PomodoroService {

    private final PomodoroSessionRepository sessionRepository;
    private final TaskRepository taskRepository;

    @Override
    public PomodoroSessionDTO startSession(Long taskId, PomodoroType type) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));

        PomodoroSession session = PomodoroSession.builder()
                .task(task)
                .type(type)
                .startTime(LocalDateTime.now())
                .completed(false)
                .build();

        session = sessionRepository.save(session);
        return mapToDTO(session);
    }

    @Override
    public PomodoroSessionDTO completeSession(Long sessionId) {
        PomodoroSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found with id: " + sessionId));

        session.complete();
        
        if (session.getType() == PomodoroType.WORK) {
            Task task = session.getTask();
            task.setCompletedPomodoros(task.getCompletedPomodoros() + 1);
            taskRepository.save(task);
        }

        session = sessionRepository.save(session);
        return mapToDTO(session);
    }

    @Override
    public List<PomodoroSessionDTO> getSessionsByTaskId(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));

        return sessionRepository.findByTaskOrderByStartTimeDesc(task)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PomodoroSessionDTO> getSessionsByTaskAndDateRange(Long taskId, LocalDateTime start, LocalDateTime end) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));

        return sessionRepository.findByTaskAndStartTimeBetweenOrderByStartTimeDesc(task, start, end)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PomodoroSessionDTO getSessionById(Long sessionId) {
        return sessionRepository.findById(sessionId)
                .map(this::mapToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Session not found with id: " + sessionId));
    }

    @Override
    public void deleteSession(Long sessionId) {
        if (!sessionRepository.existsById(sessionId)) {
            throw new EntityNotFoundException("Session not found with id: " + sessionId);
        }
        sessionRepository.deleteById(sessionId);
    }

    private PomodoroSessionDTO mapToDTO(PomodoroSession session) {
        return PomodoroSessionDTO.builder()
                .id(session.getId())
                .taskId(session.getTask().getId())
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .durationMinutes(session.getDurationMinutes())
                .type(session.getType())
                .completed(session.isCompleted())
                .build();
    }
} 