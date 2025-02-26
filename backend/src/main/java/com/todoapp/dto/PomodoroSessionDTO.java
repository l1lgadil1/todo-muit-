package com.todoapp.dto;

import com.todoapp.model.PomodoroType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Data Transfer Object for Pomodoro Session information")
public class PomodoroSessionDTO {
    @Schema(description = "Unique identifier of the pomodoro session", example = "1")
    private Long id;
    
    @Schema(description = "ID of the associated task", example = "1", required = true)
    private Long taskId;
    
    @Schema(description = "Date and time when the session started", example = "2023-06-15T10:30:00")
    private LocalDateTime startTime;
    
    @Schema(description = "Date and time when the session ended", example = "2023-06-15T10:55:00")
    private LocalDateTime endTime;
    
    @Schema(description = "Duration of the session in minutes", example = "25")
    private Integer durationMinutes;
    
    @Schema(description = "Type of pomodoro session", example = "WORK", required = true)
    private PomodoroType type;
    
    @Schema(description = "Whether the session has been completed", example = "true")
    private boolean completed;
} 