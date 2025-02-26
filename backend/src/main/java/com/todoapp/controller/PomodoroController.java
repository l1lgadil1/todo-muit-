package com.todoapp.controller;

import com.todoapp.dto.PomodoroSessionDTO;
import com.todoapp.model.PomodoroType;
import com.todoapp.service.PomodoroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/pomodoros")
@RequiredArgsConstructor
@Tag(name = "Pomodoro Management", description = "APIs for managing pomodoro sessions")
public class PomodoroController {

    private final PomodoroService pomodoroService;

    @PostMapping("/tasks/{taskId}/start")
    @Operation(summary = "Start a pomodoro session", description = "Starts a new pomodoro session for a specific task")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Session successfully started"),
            @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
    })
    public ResponseEntity<PomodoroSessionDTO> startSession(
            @Parameter(description = "ID of the task to start a session for", required = true)
            @PathVariable Long taskId,
            @Parameter(description = "Type of pomodoro session (WORK, SHORT_BREAK, LONG_BREAK)", required = true)
            @RequestParam PomodoroType type) {
        return ResponseEntity.ok(pomodoroService.startSession(taskId, type));
    }

    @PostMapping("/{sessionId}/complete")
    @Operation(summary = "Complete a pomodoro session", description = "Marks a pomodoro session as completed")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Session successfully completed"),
            @ApiResponse(responseCode = "404", description = "Session not found", content = @Content)
    })
    public ResponseEntity<PomodoroSessionDTO> completeSession(
            @Parameter(description = "ID of the session to complete", required = true)
            @PathVariable Long sessionId) {
        return ResponseEntity.ok(pomodoroService.completeSession(sessionId));
    }

    @GetMapping("/tasks/{taskId}")
    @Operation(summary = "Get sessions by task", description = "Retrieves all pomodoro sessions for a specific task")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved sessions"),
            @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
    })
    public ResponseEntity<List<PomodoroSessionDTO>> getSessionsByTaskId(
            @Parameter(description = "ID of the task to get sessions for", required = true)
            @PathVariable Long taskId) {
        return ResponseEntity.ok(pomodoroService.getSessionsByTaskId(taskId));
    }

    @GetMapping("/tasks/{taskId}/range")
    @Operation(summary = "Get sessions by date range", description = "Retrieves pomodoro sessions for a task within a date range")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved sessions"),
            @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
    })
    public ResponseEntity<List<PomodoroSessionDTO>> getSessionsByTaskAndDateRange(
            @Parameter(description = "ID of the task to get sessions for", required = true)
            @PathVariable Long taskId,
            @Parameter(description = "Start date and time (ISO format)", required = true)
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @Parameter(description = "End date and time (ISO format)", required = true)
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(pomodoroService.getSessionsByTaskAndDateRange(taskId, start, end));
    }

    @GetMapping("/{sessionId}")
    @Operation(summary = "Get session by ID", description = "Retrieves a specific pomodoro session by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved session"),
            @ApiResponse(responseCode = "404", description = "Session not found", content = @Content)
    })
    public ResponseEntity<PomodoroSessionDTO> getSessionById(
            @Parameter(description = "ID of the session to retrieve", required = true)
            @PathVariable Long sessionId) {
        return ResponseEntity.ok(pomodoroService.getSessionById(sessionId));
    }

    @DeleteMapping("/{sessionId}")
    @Operation(summary = "Delete a session", description = "Deletes a pomodoro session by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Session successfully deleted"),
            @ApiResponse(responseCode = "404", description = "Session not found", content = @Content)
    })
    public ResponseEntity<Void> deleteSession(
            @Parameter(description = "ID of the session to delete", required = true)
            @PathVariable Long sessionId) {
        pomodoroService.deleteSession(sessionId);
        return ResponseEntity.noContent().build();
    }
} 