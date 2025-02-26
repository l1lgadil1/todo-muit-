package com.todoapp.controller;

import com.todoapp.dto.TaskDTO;
import com.todoapp.model.TaskStatus;
import com.todoapp.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@Tag(name = "Task Management", description = "APIs for managing tasks")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    @Operation(summary = "Get all tasks", description = "Retrieves a list of all tasks ordered by creation date")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved tasks")
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get tasks by status", description = "Retrieves tasks filtered by their status")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved tasks")
    public ResponseEntity<List<TaskDTO>> getTasksByStatus(
            @Parameter(description = "Task status to filter by", required = true)
            @PathVariable TaskStatus status) {
        return ResponseEntity.ok(taskService.getTasksByStatus(status));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID", description = "Retrieves a specific task by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved task"),
            @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
    })
    public ResponseEntity<TaskDTO> getTaskById(
            @Parameter(description = "ID of the task to retrieve", required = true)
            @PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new task", description = "Creates a new task with the provided details")
    @ApiResponse(responseCode = "200", description = "Task successfully created")
    public ResponseEntity<TaskDTO> createTask(
            @Parameter(description = "Task details", required = true, schema = @Schema(implementation = TaskDTO.class))
            @Valid @RequestBody TaskDTO taskDTO) {
        return ResponseEntity.ok(taskService.createTask(taskDTO));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a task", description = "Updates an existing task with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task successfully updated"),
            @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
    })
    public ResponseEntity<TaskDTO> updateTask(
            @Parameter(description = "ID of the task to update", required = true)
            @PathVariable Long id,
            @Parameter(description = "Updated task details", required = true, schema = @Schema(implementation = TaskDTO.class))
            @Valid @RequestBody TaskDTO taskDTO) {
        return ResponseEntity.ok(taskService.updateTask(id, taskDTO));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update task status", description = "Updates the status of an existing task")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task status successfully updated"),
            @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
    })
    public ResponseEntity<TaskDTO> updateTaskStatus(
            @Parameter(description = "ID of the task to update", required = true)
            @PathVariable Long id,
            @Parameter(description = "New status for the task", required = true)
            @RequestParam TaskStatus status) {
        return ResponseEntity.ok(taskService.updateTaskStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a task", description = "Deletes a task by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Task successfully deleted"),
            @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
    })
    public ResponseEntity<Void> deleteTask(
            @Parameter(description = "ID of the task to delete", required = true)
            @PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
} 