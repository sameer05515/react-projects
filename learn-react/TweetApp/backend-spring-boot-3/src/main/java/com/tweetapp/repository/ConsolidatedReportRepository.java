package com.tweetapp.repository;

import com.tweetapp.model.ConsolidatedReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConsolidatedReportRepository extends MongoRepository<ConsolidatedReport, String> {
    Optional<ConsolidatedReport> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

