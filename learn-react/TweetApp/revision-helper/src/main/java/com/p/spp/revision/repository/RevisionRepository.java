package com.p.spp.revision.repository;

import com.p.spp.revision.entity.Revision;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RevisionRepository extends MongoRepository<Revision,String> {
    // Query to get revisions due today
    List<Revision> findByRevisionDatesContaining(LocalDate today);
}
