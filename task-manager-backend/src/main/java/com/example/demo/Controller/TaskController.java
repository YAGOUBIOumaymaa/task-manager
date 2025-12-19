package com.example.demo.Controller;

import com.example.demo.Service.TaskService;
import com.example.demo.model.Task;
import com.example.demo.model.User;
import com.example.demo.dto.CreateTaskRequest;
import com.example.demo.dto.UpdateTaskRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects/{projectId}/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(
            @PathVariable Long projectId,
            @AuthenticationPrincipal User user) {

        List<Task> tasks = taskService.getTasksWithAccessCheck(projectId, user);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(
            @PathVariable Long projectId,
            @RequestBody CreateTaskRequest request,
            @AuthenticationPrincipal User user) {

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());

        Task created = taskService.createTask(projectId, task, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long projectId,
            @PathVariable Long taskId,
            @RequestBody UpdateTaskRequest request,
            @AuthenticationPrincipal User user) {

        Task taskData = new Task();
        taskData.setTitle(request.getTitle());
        taskData.setDescription(request.getDescription());
        taskData.setDueDate(request.getDueDate());
        taskData.setCompleted(request.getCompleted());

        Task updated = taskService.updateTask(projectId, taskId, taskData, user);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long projectId,
            @PathVariable Long taskId,
            @AuthenticationPrincipal User user) {

        taskService.deleteTask(projectId, taskId, user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTask(
            @PathVariable Long projectId,
            @PathVariable Long taskId,
            @AuthenticationPrincipal User user) {

        Task task = taskService.getTaskWithAccessCheck(projectId, taskId, user);
        return ResponseEntity.ok(task);
    }
}





