package com.example.demo.repository;

import com.example.demo.entity.DailyReflection;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DailyReflectionRepository
        extends MongoRepository<DailyReflection, String> {

    Optional<DailyReflection> findByDate(LocalDate date);
}