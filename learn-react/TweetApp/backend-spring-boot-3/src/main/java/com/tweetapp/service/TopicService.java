package com.tweetapp.service;

import com.tweetapp.model.Topic;
import com.tweetapp.model.TopicSection;
import com.tweetapp.repository.TopicRepository;
import com.tweetapp.repository.TopicSectionRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
        topic.setPublished(Boolean.FALSE);
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
            if (Boolean.TRUE.equals(topicData.get("published"))) {
                throw new IllegalArgumentException("Use PUT /:uniqueId/publish to publish a topic");
            }
            if (Boolean.FALSE.equals(topicData.get("published"))) {
                topic.setPublished(Boolean.FALSE);
            }
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

    public Map<String, Object> createTopicsBulk(List<Map<String, Object>> topicsPayload) {
        List<Topic> created = new ArrayList<>();
        List<Map<String, Object>> errors = new ArrayList<>();
        if (topicsPayload == null || topicsPayload.isEmpty()) {
            return Map.of("created", created, "errors", errors);
        }

        for (int i = 0; i < topicsPayload.size(); i++) {
            try {
                Map<String, Object> payload = topicsPayload.get(i);
                String name = payload.get("name") != null ? String.valueOf(payload.get("name")).trim() : "";
                if (name.isEmpty()) {
                    errors.add(Map.of("index", i, "message", "Name is required"));
                    continue;
                }
                created.add(createTopic(payload));
            } catch (Exception ex) {
                errors.add(Map.of("index", i, "message", ex.getMessage() != null ? ex.getMessage() : "Failed to create topic"));
            }
        }

        return Map.of("created", created, "errors", errors);
    }
    
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public List<Map<String, Object>> getAllTopicsForExport() {
        List<Topic> topics = topicRepository.findAll();
        Map<String, List<TopicSection>> sectionsByTopic = topicSectionRepository.findAll().stream()
            .collect(Collectors.groupingBy(TopicSection::getLinkedTopicUniqueId));

        List<Map<String, Object>> export = new ArrayList<>();
        for (Topic topic : topics) {
            Map<String, Object> row = new HashMap<>();
            row.put("uniqueId", topic.getUniqueId());
            row.put("name", topic.getName());
            row.put("parentId", topic.getParentId());
            row.put("description", topic.getDescription());
            row.put("smartContent", topic.getSmartContent());
            row.put("tags", topic.getTags());
            row.put("published", Boolean.TRUE.equals(topic.getPublished()));
            row.put("sections", sectionsByTopic.getOrDefault(topic.getUniqueId(), List.of()));
            export.add(row);
        }
        return export;
    }

    public List<Map<String, Object>> getAllTopicsFlatForExport() {
        List<Topic> topics = topicRepository.findAll();
        Map<String, Topic> topicByUniqueId = topics.stream()
            .collect(Collectors.toMap(Topic::getUniqueId, t -> t, (a, b) -> a));
        Map<String, List<TopicSection>> sectionsByTopic = topicSectionRepository.findAll().stream()
            .collect(Collectors.groupingBy(TopicSection::getLinkedTopicUniqueId));

        List<Map<String, Object>> flattened = new ArrayList<>();
        for (Topic topic : topics) {
            Map<String, Object> row = new HashMap<>();
            row.put("uniqueId", topic.getUniqueId());
            row.put("name", topic.getName());
            row.put("parentId", topic.getParentId());
            row.put("description", topic.getDescription());
            row.put("smartContent", topic.getSmartContent());
            row.put("tags", topic.getTags());
            row.put("published", Boolean.TRUE.equals(topic.getPublished()));
            row.put("ancestors", getAllAncestors(topic.getParentId(), topicByUniqueId));
            row.put("sections", sectionsByTopic.getOrDefault(topic.getUniqueId(), List.of()));
            flattened.add(row);
        }
        return flattened;
    }

    public List<Map<String, Object>> getPublishedTopics() {
        List<Topic> published = topicRepository.findByPublishedTrue();
        return buildTreeFromFlatPublished(published);
    }
    
    public Topic getTopicByUniqueId(String uniqueId) {
        return topicRepository.findByUniqueId(uniqueId).orElse(null);
    }

    public Topic publishTopicByUniqueId(String uniqueId) {
        Topic topic = topicRepository.findByUniqueId(uniqueId)
            .orElseThrow(() -> new IllegalArgumentException("Topic not found, uniqueId: " + uniqueId));
        if (Boolean.TRUE.equals(topic.getPublished())) {
            return topic;
        }
        if (!areAllAncestorsPublished(topic.getParentId())) {
            throw new IllegalArgumentException("Cannot publish: parent or an ancestor topic is not published");
        }
        topic.setPublished(Boolean.TRUE);
        topic.setUpdatedDate(LocalDateTime.now());
        return topicRepository.save(topic);
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

    private boolean areAllAncestorsPublished(String parentId) {
        if (parentId == null || parentId.isBlank()) return true;
        Topic parent = topicRepository.findByUniqueId(parentId).orElse(null);
        if (parent == null) return true;
        if (!Boolean.TRUE.equals(parent.getPublished())) return false;
        return areAllAncestorsPublished(parent.getParentId());
    }

    private List<Map<String, Object>> getAllAncestors(String parentId, Map<String, Topic> topicByUniqueId) {
        List<Map<String, Object>> ancestors = new ArrayList<>();
        String currentParentId = parentId;
        while (currentParentId != null && !currentParentId.isBlank()) {
            Topic parent = topicByUniqueId.get(currentParentId);
            if (parent == null) break;
            ancestors.add(0, Map.of(
                "uniqueId", parent.getUniqueId(),
                "name", parent.getName()
            ));
            currentParentId = parent.getParentId();
        }
        return ancestors;
    }

    private List<Map<String, Object>> buildTreeFromFlatPublished(List<Topic> flatList) {
        if (flatList == null || flatList.isEmpty()) return List.of();

        Map<String, Map<String, Object>> byId = new HashMap<>();
        for (Topic t : flatList) {
            Map<String, Object> node = new HashMap<>();
            node.put("uniqueId", t.getUniqueId());
            node.put("name", t.getName());
            node.put("parentId", t.getParentId());
            node.put("description", t.getDescription());
            node.put("smartContent", t.getSmartContent());
            node.put("tags", t.getTags());
            node.put("published", Boolean.TRUE.equals(t.getPublished()));
            node.put("children", new ArrayList<Map<String, Object>>());
            byId.put(t.getUniqueId(), node);
        }

        Set<String> publishedIds = byId.keySet();
        List<Map<String, Object>> roots = new ArrayList<>();
        for (Topic t : flatList) {
            Map<String, Object> node = byId.get(t.getUniqueId());
            String parentId = t.getParentId();
            if (parentId == null || parentId.isBlank() || !publishedIds.contains(parentId)) {
                roots.add(node);
                continue;
            }
            Map<String, Object> parent = byId.get(parentId);
            if (parent != null) {
                ((List<Map<String, Object>>) parent.get("children")).add(node);
            } else {
                roots.add(node);
            }
        }
        return roots;
    }
}

