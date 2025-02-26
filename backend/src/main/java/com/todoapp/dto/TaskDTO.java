package com.todoapp.dto;

import com.todoapp.model.TaskStatus;
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
@Schema(description = "Data Transfer Object for Task information")
public class TaskDTO {
    @Schema(description = "Unique identifier of the task", example = "1")
    private Long id;
    
    @Schema(description = "Title of the task", example = "Complete project documentation", required = true)
    private String title;
    
    @Schema(description = "Detailed description of the task", example = "Write comprehensive documentation for the Todo app")
    private String description;
    
    @Schema(description = "Current status of the task", example = "IN_PROGRESS", required = true)
    private TaskStatus status;
    
    @Schema(description = "Date and time when the task was created", example = "2023-06-15T10:30:00")
    private LocalDateTime createdAt;
    
    @Schema(description = "Date and time when the task was last updated", example = "2023-06-15T14:45:00")
    private LocalDateTime updatedAt;
    
    @Schema(description = "Date and time when the task was completed", example = "2023-06-16T09:15:00")
    private LocalDateTime completedAt;
    
    @Schema(description = "Estimated number of pomodoro sessions required to complete the task", example = "4")
    private Integer estimatedPomodoros;
    
    @Schema(description = "Number of completed pomodoro sessions for this task", example = "2")
    private Integer completedPomodoros;
} 