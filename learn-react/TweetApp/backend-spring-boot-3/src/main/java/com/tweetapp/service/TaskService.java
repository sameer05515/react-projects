package com.tweetapp.service;

import com.tweetapp.model.Task;
import com.tweetapp.repository.TaskRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    public Task getTaskById(String uniqueId) {
        return taskRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public Task createTask(Map<String, Object> taskData) {
        Task task = new Task();
        task.setUniqueId(UuidUtil.generateUuid());
        task.setName((String) taskData.get("name"));
        task.setParentId(taskData.get("parentId") != null ? (String) taskData.get("parentId") : "");
        task.setTaskStatus(taskData.get("taskStatus") != null ? (String) taskData.get("taskStatus") : "In Progress");
        task.setTags(taskData.get("tags") != null ? (List<String>) taskData.get("tags") : new ArrayList<>());
        task.setLinkedTasks(taskData.get("linkedTasks") != null ? (List<String>) taskData.get("linkedTasks") : new ArrayList<>());
        task.setCreatedDate(LocalDateTime.now());
        task.setUpdatedDate(LocalDateTime.now());
        return taskRepository.save(task);
    }
    
    public Task updateTask(String uniqueId, Map<String, Object> taskData) {
        Optional<Task> optionalTask = taskRepository.findByUniqueId(uniqueId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            if (taskData.containsKey("name")) task.setName((String) taskData.get("name"));
            if (taskData.containsKey("parentId")) task.setParentId((String) taskData.get("parentId"));
            if (taskData.containsKey("taskStatus")) task.setTaskStatus((String) taskData.get("taskStatus"));
            if (taskData.containsKey("tags")) task.setTags((List<String>) taskData.get("tags"));
            if (taskData.containsKey("linkedTasks")) task.setLinkedTasks((List<String>) taskData.get("linkedTasks"));
            task.setUpdatedDate(LocalDateTime.now());
            return taskRepository.save(task);
        }
        return null;
    }
    
    public boolean deleteTask(String uniqueId) {
        Optional<Task> optionalTask = taskRepository.findByUniqueId(uniqueId);
        if (optionalTask.isPresent()) {
            taskRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
}

