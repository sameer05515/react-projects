package com.data.analysis.repository;

import com.data.analysis.model.DataElement;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface DataElementRepository extends MongoRepository<DataElement, String> {

    long countByTagsContaining(String tag);

//    @Query("{$group: {_id: '$tags', count: {$sum: 1}}}")
//    List<TagCountProjection> getTagCounts();
//
//    @Query(value = "{$group: {_id: '$tags', count: {$sum: 1}}}", fields = "{ '_id': 1, 'count': 1 }")
//    List<TagCountProjection> getTagCountsForResponse();
//
//    interface TagCountProjection {
//        List<String> get_id();
//        long getCount();
//    }

    @Aggregation(pipeline = { "{$unwind: '$tags'}", "{$group: {_id: '$tags', count: {$sum: 1}}}" })
    List<TagCountProjection> getTagCounts();

    interface TagCountProjection {
        List<String> get_id();
        long getCount();
    }

}
