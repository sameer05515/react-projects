package com.tweetapp.service;

import com.tweetapp.model.ComparableObject;
import com.tweetapp.repository.ComparableObjectRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ComparableObjectService {
    
    @Autowired
    private ComparableObjectRepository comparableObjectRepository;
    
    public List<ComparableObject> getAllComparableObjects() {
        return comparableObjectRepository.findAll();
    }
    
    public ComparableObject getComparableObjectByUniqueId(String uniqueId) {
        return comparableObjectRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public ComparableObject createComparableObject(Map<String, Object> objectData) {
        ComparableObject obj = new ComparableObject();
        obj.setUniqueId(UuidUtil.generateUuid());
        obj.setName((String) objectData.get("name"));
        obj.setDescription((String) objectData.get("description"));
        obj.setCreatedDate(LocalDateTime.now());
        obj.setUpdatedDate(LocalDateTime.now());
        return comparableObjectRepository.save(obj);
    }
    
    public ComparableObject updateComparableObjectByUniqueId(String uniqueId, Map<String, Object> objectData) {
        Optional<ComparableObject> optionalObj = comparableObjectRepository.findByUniqueId(uniqueId);
        if (optionalObj.isPresent()) {
            ComparableObject obj = optionalObj.get();
            if (objectData.containsKey("name")) obj.setName((String) objectData.get("name"));
            if (objectData.containsKey("description")) obj.setDescription((String) objectData.get("description"));
            obj.setUpdatedDate(LocalDateTime.now());
            return comparableObjectRepository.save(obj);
        }
        return null;
    }
    
    public boolean deleteComparableObjectByUniqueId(String uniqueId) {
        Optional<ComparableObject> optionalObj = comparableObjectRepository.findByUniqueId(uniqueId);
        if (optionalObj.isPresent()) {
            comparableObjectRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
}

