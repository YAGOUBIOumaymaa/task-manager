package com.example.demo.Service;

import com.example.demo.dto.ProjectProgressDTO;
import com.example.demo.model.Project;
import com.example.demo.model.User;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectService {

    private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public ProjectService(ProjectRepository projectRepository,
                          UserRepository userRepository,
                          TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    public List<Project> getProjects(User user) {
        User attachedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return projectRepository.findByUser(attachedUser);
    }


    public Optional<Project> getProject(Long id) {
        return projectRepository.findById(id);
    }

    public Project createProject(Project project) {
        User attachedUser = userRepository.findById(project.getUser().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        project.setUser(attachedUser);
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public boolean canUserAccessProject(Long projectId, User user) {
        return projectRepository.existsByProjectIdAndUserId(projectId, user.getId());
    }

    public ProjectProgressDTO getProjectProgress(Long projectId, User user) {

        if (!canUserAccessProject(projectId, user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        int totalTasks = taskRepository.countByProjectId(projectId);
        int completedTasks = taskRepository.countByProjectIdAndCompletedTrue(projectId);

        logger.info("Project {} progress: {}/{}", projectId, completedTasks, totalTasks);

        return new ProjectProgressDTO(totalTasks, completedTasks);
    }
}
