package com.data.analysis.controller;

import com.data.analysis.model.DataElement;
import com.data.analysis.repository.DataElementRepository;
import com.data.analysis.response.TagCountResponse;
import com.data.analysis.response.TagCountResponseList;
import com.data.analysis.response.TagCountResponseList1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final DataElementRepository dataElementRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public TagController(DataElementRepository dataElementRepository, MongoTemplate mongoTemplate) {
        this.dataElementRepository = dataElementRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/count")
    public TagCountResponse getTagCount(@RequestParam String tagName) {
        long totalCount = dataElementRepository.countByTagsContaining(tagName);
        return new TagCountResponse(tagName, totalCount);
    }

//    @GetMapping("/list")
//    public List<TagCountResponseList> getTagListWithCounts() {
//        List<DataElementRepository.TagCountProjection> tagCounts = dataElementRepository.getTagCountsForResponse();
//
//        return tagCounts.stream()
//                .map(tagCountProjection -> new TagCountResponseList(tagCountProjection.get_id(), tagCountProjection.getCount()))
//                .collect(Collectors.toList());
//    }

    @GetMapping("/list")
    public List<TagCountResponseList1> getTagListWithCounts() {
        GroupOperation group = Aggregation.group("tags").count().as("totalCount");

        TypedAggregation<DataElement> aggregation = Aggregation.newAggregation(DataElement.class, group);

        List<TagCountResponseList1> tagCounts = mongoTemplate.aggregate(aggregation, TagCountResponseList1.class)
                .getMappedResults();

        return tagCounts.stream()
                .map(tagCount -> new TagCountResponseList1(tagCount.getId(), tagCount.getTotalCount()))
                .collect(Collectors.toList());
    }
}
