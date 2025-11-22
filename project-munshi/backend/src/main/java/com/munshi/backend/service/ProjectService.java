package com.munshi.backend.service;

import com.munshi.backend.dto.ProjectRequest;
import com.munshi.backend.dto.ProjectResponse;
import com.munshi.backend.model.Project;
import com.munshi.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    
    public ProjectResponse createProject(ProjectRequest request) {
        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setStatus(request.getStatus());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());
        project.setOwner(request.getOwner());
        project.setTags(request.getTags());
        project.setCreatedAt(LocalDateTime.now());
        project.setUpdatedAt(LocalDateTime.now());
        project.setDeleted(false);
        
        Project savedProject = projectRepository.save(project);
        return mapToResponse(savedProject);
    }
    
    public List<ProjectResponse> getAllProjects() {
        return getAllProjects(false);
    }
    
    public List<ProjectResponse> getAllProjects(Boolean includeDeleted) {
        if (Boolean.TRUE.equals(includeDeleted)) {
            return projectRepository.findAll()
                    .stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());
        } else {
            return projectRepository.findByDeletedFalse()
                    .stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());
        }
    }
    
    public ProjectResponse getProjectById(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        if (Boolean.TRUE.equals(project.getDeleted())) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        return mapToResponse(project);
    }
    
    public ProjectResponse updateProject(String id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        if (Boolean.TRUE.equals(project.getDeleted())) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setStatus(request.getStatus());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());
        project.setOwner(request.getOwner());
        project.setTags(request.getTags());
        project.setUpdatedAt(LocalDateTime.now());
        
        Project updatedProject = projectRepository.save(project);
        return mapToResponse(updatedProject);
    }
    
    public void deleteProject(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        if (Boolean.TRUE.equals(project.getDeleted())) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        project.setDeleted(true);
        project.setUpdatedAt(LocalDateTime.now());
        projectRepository.save(project);
    }
    
    public List<ProjectResponse> searchProjectsByName(String name) {
        return projectRepository.findByNameContainingIgnoreCaseAndDeletedFalse(name)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<ProjectResponse> getProjectsByStatus(String status) {
        return projectRepository.findByStatusAndDeletedFalse(status)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<ProjectResponse> getProjectsByOwner(String owner) {
        return projectRepository.findByOwnerAndDeletedFalse(owner)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<ProjectResponse> createProjectsBulk(List<ProjectRequest> requests) {
        List<Project> projects = requests.stream()
                .map(request -> {
                    Project project = new Project();
                    project.setName(request.getName());
                    project.setDescription(request.getDescription());
                    project.setStatus(request.getStatus());
                    project.setStartDate(request.getStartDate());
                    project.setEndDate(request.getEndDate());
                    project.setOwner(request.getOwner());
                    project.setTags(request.getTags());
                    project.setCreatedAt(LocalDateTime.now());
                    project.setUpdatedAt(LocalDateTime.now());
                    project.setDeleted(false);
                    return project;
                })
                .collect(Collectors.toList());
        
        List<Project> savedProjects = projectRepository.saveAll(projects);
        return savedProjects.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    private ProjectResponse mapToResponse(Project project) {
        ProjectResponse response = new ProjectResponse();
        response.setId(project.getId());
        response.setName(project.getName());
        response.setDescription(project.getDescription());
        response.setStatus(project.getStatus());
        response.setStartDate(project.getStartDate());
        response.setEndDate(project.getEndDate());
        response.setOwner(project.getOwner());
        response.setTags(project.getTags());
        response.setCreatedAt(project.getCreatedAt());
        response.setUpdatedAt(project.getUpdatedAt());
        return response;
    }
}

