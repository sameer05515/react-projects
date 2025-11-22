package com.munshi.backend.repository;

import com.munshi.backend.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    
    List<Project> findByDeletedFalse();
    
    List<Project> findByNameContainingIgnoreCaseAndDeletedFalse(String name);
    
    List<Project> findByStatusAndDeletedFalse(String status);
    
    List<Project> findByOwnerAndDeletedFalse(String owner);
}

