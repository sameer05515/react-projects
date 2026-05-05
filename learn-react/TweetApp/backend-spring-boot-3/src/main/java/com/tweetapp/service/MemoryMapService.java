package com.tweetapp.service;

import com.tweetapp.model.MemoryMap;
import com.tweetapp.repository.MemoryMapRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MemoryMapService {
    
    @Autowired
    private MemoryMapRepository memoryMapRepository;
    
    public List<MemoryMap> getAllMemoryMaps() {
        return memoryMapRepository.findAll();
    }
    
    public MemoryMap getMemoryMapByUniqueId(String uniqueId) {
        return memoryMapRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public MemoryMap createMemoryMap(Map<String, Object> memoryMapData) {
        MemoryMap memoryMap = new MemoryMap();
        memoryMap.setUniqueId(UuidUtil.generateUuid());
        memoryMap.setName((String) memoryMapData.get("name"));
        memoryMap.setParentId(memoryMapData.get("parentId") != null ? (String) memoryMapData.get("parentId") : "");
        memoryMap.setSkeleton(memoryMapData.get("skeleton") != null ? (String) memoryMapData.get("skeleton") : "");
        memoryMap.setSkeletonTextType((String) memoryMapData.get("skeletonTextType"));
        memoryMap.setCreatedDate(LocalDateTime.now());
        memoryMap.setUpdatedDate(LocalDateTime.now());
        return memoryMapRepository.save(memoryMap);
    }
    
    public MemoryMap updateMemoryMapByUniqueId(String uniqueId, Map<String, Object> memoryMapData) {
        Optional<MemoryMap> optionalMemoryMap = memoryMapRepository.findByUniqueId(uniqueId);
        if (optionalMemoryMap.isPresent()) {
            MemoryMap memoryMap = optionalMemoryMap.get();
            if (memoryMapData.containsKey("name")) memoryMap.setName((String) memoryMapData.get("name"));
            if (memoryMapData.containsKey("parentId")) memoryMap.setParentId((String) memoryMapData.get("parentId"));
            if (memoryMapData.containsKey("skeleton")) memoryMap.setSkeleton((String) memoryMapData.get("skeleton"));
            if (memoryMapData.containsKey("skeletonTextType")) memoryMap.setSkeletonTextType((String) memoryMapData.get("skeletonTextType"));
            memoryMap.setUpdatedDate(LocalDateTime.now());
            return memoryMapRepository.save(memoryMap);
        }
        return null;
    }
    
    public MemoryMap updateSkeleton(String uniqueId, Map<String, Object> skeletonData) {
        Optional<MemoryMap> optionalMemoryMap = memoryMapRepository.findByUniqueId(uniqueId);
        if (optionalMemoryMap.isPresent()) {
            MemoryMap memoryMap = optionalMemoryMap.get();
            if (skeletonData.containsKey("skeleton")) memoryMap.setSkeleton((String) skeletonData.get("skeleton"));
            if (skeletonData.containsKey("skeletonTextType")) memoryMap.setSkeletonTextType((String) skeletonData.get("skeletonTextType"));
            memoryMap.setUpdatedDate(LocalDateTime.now());
            return memoryMapRepository.save(memoryMap);
        }
        return null;
    }
    
    public boolean deleteMemoryMapByUniqueId(String uniqueId) {
        Optional<MemoryMap> optionalMemoryMap = memoryMapRepository.findByUniqueId(uniqueId);
        if (optionalMemoryMap.isPresent()) {
            memoryMapRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
    
    public List<MemoryMap> searchMemoryMaps(String searchString) {
        return memoryMapRepository.findAll().stream()
                .filter(mm -> mm.getName() != null && mm.getName().toLowerCase().contains(searchString.toLowerCase()))
                .collect(java.util.stream.Collectors.toList());
    }
}

