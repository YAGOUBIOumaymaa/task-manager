package com.example.demo.Service;

import com.example.demo.model.Task;
import com.example.demo.model.Project;
import com.example.demo.model.User;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public List<Task> getTasks(Project project) {
        return taskRepository.findByProject(project);
    }

    public Task createTask(Long projectId, Task task, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        if (!project.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied to project");
        }

        task.setProject(project);
        task.setCompleted(false);
        return taskRepository.save(task);
    }

    public Task getTaskWithAccessCheck(Long projectId, Long taskId, User user) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        if (!task.getProject().getId().equals(projectId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task does not belong to this project");
        }

        if (!canUserAccessProject(projectId, user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied to project");
        }

        return task;
    }

    public Task updateTask(Long projectId, Long taskId, Task updatedTaskData, User user) {
        Task task = getTaskWithAccessCheck(projectId, taskId, user);

        if (updatedTaskData.getTitle() != null) task.setTitle(updatedTaskData.getTitle());
        if (updatedTaskData.getDescription() != null) task.setDescription(updatedTaskData.getDescription());
        if (updatedTaskData.getDueDate() != null) task.setDueDate(updatedTaskData.getDueDate());
        if (updatedTaskData.getCompleted() != null) task.setCompleted(updatedTaskData.getCompleted());

        return taskRepository.save(task);
    }

    public void deleteTask(Long projectId, Long taskId, User user) {
        Task task = getTaskWithAccessCheck(projectId, taskId, user);
        taskRepository.delete(task);
    }

    public boolean canUserAccessProject(Long projectId, User user) {
        Optional<Project> project = projectRepository.findById(projectId);
        return project.isPresent() &&
                project.get().getUser() != null &&
                project.get().getUser().getId().equals(user.getId());
    }

    public List<Task> getTasksWithAccessCheck(Long projectId, User user) {
        if (!canUserAccessProject(projectId, user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied to project");
        }

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        return taskRepository.findByProject(project);
    }

}
