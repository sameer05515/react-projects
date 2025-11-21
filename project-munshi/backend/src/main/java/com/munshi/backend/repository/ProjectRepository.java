package com.munshi.backend.repository;

import com.munshi.backend.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    
    List<Project> findByNameContainingIgnoreCase(String name);
    
    List<Project> findByStatus(String status);
    
    List<Project> findByOwner(String owner);
}

