package com.prem.myresume.repository;

import com.prem.myresume.entity.MyResume;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MyResumeRepository extends MongoRepository<MyResume, ObjectId> {
    Optional<MyResume> findByUniqueId(String uniqueId);
}
