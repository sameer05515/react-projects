package com.tweetapp.service;

import com.tweetapp.model.Topic;
import com.tweetapp.model.TopicSection;
import com.tweetapp.repository.TopicRepository;
import com.tweetapp.repository.TopicSectionRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TopicService {
    
    @Autowired
    private TopicRepository topicRepository;
    
    @Autowired
    private TopicSectionRepository topicSectionRepository;
    
    public Topic createTopic(Map<String, Object> topicData) {
        Topic topic = new Topic();
        topic.setUniqueId(UuidUtil.generateUuid());
        topic.setName((String) topicData.get("name"));
        topic.setDescription((String) topicData.get("description"));
        topic.setParentId(topicData.get("parentId") != null ? (String) topicData.get("parentId") : "");
        topic.setTags((List<String>) topicData.get("tags"));
        topic.setOccurenceDate(topicData.get("occurenceDate") != null ? 
            LocalDateTime.parse((String) topicData.get("occurenceDate")) : LocalDateTime.now());
        topic.setCreatedDate(LocalDateTime.now());
        topic.setUpdatedDate(LocalDateTime.now());
        return topicRepository.save(topic);
    }
    
    public Topic updateTopicByUniqueId(String uniqueId, Map<String, Object> topicData) {
        Optional<Topic> optionalTopic = topicRepository.findByUniqueId(uniqueId);
        if (optionalTopic.isPresent()) {
            Topic topic = optionalTopic.get();
            if (topicData.containsKey("name")) topic.setName((String) topicData.get("name"));
            if (topicData.containsKey("description")) topic.setDescription((String) topicData.get("description"));
            if (topicData.containsKey("parentId")) topic.setParentId((String) topicData.get("parentId"));
            if (topicData.containsKey("tags")) topic.setTags((List<String>) topicData.get("tags"));
            if (topicData.containsKey("occurenceDate")) {
                topic.setOccurenceDate(LocalDateTime.parse((String) topicData.get("occurenceDate")));
            }
            topic.setUpdatedDate(LocalDateTime.now());
            return topicRepository.save(topic);
        }
        return null;
    }
    
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }
    
    public Topic getTopicByUniqueId(String uniqueId) {
        return topicRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public List<Topic> searchTopics(String searchString, Map<String, Object> searchOptions) {
        return topicRepository.findByNameContainingIgnoreCase(searchString);
    }
    
    public Topic createTopicSection(Map<String, Object> sectionData) {
        TopicSection section = new TopicSection();
        section.setUniqueId(UuidUtil.generateUuid());
        section.setLinkedTopicUniqueId((String) sectionData.get("linkedTopicUniqueId"));
        section.setName((String) sectionData.get("name"));
        section.setOrder((Integer) sectionData.get("order"));
        section.setTags((List<String>) sectionData.get("tags"));
        section.setCreatedDate(LocalDateTime.now());
        section.setUpdatedDate(LocalDateTime.now());
        topicSectionRepository.save(section);
        
        // Return the updated topic
        return topicRepository.findByUniqueId(section.getLinkedTopicUniqueId()).orElse(null);
    }
    
    public List<TopicSection> getAllTopicSectionsById(String uniqueId) {
        return topicSectionRepository.findByLinkedTopicUniqueId(uniqueId);
    }
    
    public TopicSection getTopicSectionsById(String uniqueId, String sectionUniqueId) {
        return topicSectionRepository.findByUniqueId(sectionUniqueId).orElse(null);
    }
    
    public Topic updateTopicSectionsById(String uniqueId, String sectionUniqueId, Map<String, Object> sectionData) {
        Optional<TopicSection> optionalSection = topicSectionRepository.findByUniqueId(sectionUniqueId);
        if (optionalSection.isPresent()) {
            TopicSection section = optionalSection.get();
            if (sectionData.containsKey("name")) section.setName((String) sectionData.get("name"));
            if (sectionData.containsKey("order")) section.setOrder((Integer) sectionData.get("order"));
            if (sectionData.containsKey("tags")) section.setTags((List<String>) sectionData.get("tags"));
            section.setUpdatedDate(LocalDateTime.now());
            topicSectionRepository.save(section);
            
            // Return the updated topic
            return topicRepository.findByUniqueId(uniqueId).orElse(null);
        }
        return null;
    }
}

