package com.tweetapp.service;

import com.tweetapp.model.Tag;
import com.tweetapp.repository.TagRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TagService {
    
    @Autowired
    private TagRepository tagRepository;
    
    public Tag createTag(Map<String, Object> tagData) {
        Tag tag = new Tag();
        tag.setUniqueId(UuidUtil.generateUuid());
        tag.setName((String) tagData.get("name"));
        tag.setDescription((String) tagData.get("description"));
        tag.setParentId(tagData.get("parentId") != null ? (String) tagData.get("parentId") : "");
        tag.setCreatedDate(LocalDateTime.now());
        tag.setUpdatedDate(LocalDateTime.now());
        return tagRepository.save(tag);
    }
    
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
    
    public Tag getTagById(String uniqueId) {
        return tagRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public Tag updateTagById(String uniqueId, Map<String, Object> tagData) {
        Optional<Tag> optionalTag = tagRepository.findByUniqueId(uniqueId);
        if (optionalTag.isPresent()) {
            Tag tag = optionalTag.get();
            if (tagData.containsKey("name")) tag.setName((String) tagData.get("name"));
            if (tagData.containsKey("description")) tag.setDescription((String) tagData.get("description"));
            if (tagData.containsKey("parentId")) tag.setParentId((String) tagData.get("parentId"));
            tag.setUpdatedDate(LocalDateTime.now());
            return tagRepository.save(tag);
        }
        return null;
    }
    
    public boolean deleteTagById(String uniqueId) {
        Optional<Tag> optionalTag = tagRepository.findByUniqueId(uniqueId);
        if (optionalTag.isPresent()) {
            tagRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
}

