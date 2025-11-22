package com.tweetapp.service;

import com.tweetapp.model.RelatedNode;
import com.tweetapp.repository.RelatedNodeRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RelatedNodeService {
    
    @Autowired
    private RelatedNodeRepository relatedNodeRepository;
    
    public List<RelatedNode> getAllRelatedNodes() {
        return relatedNodeRepository.findAll();
    }
    
    public RelatedNode getRelatedNodeByUniqueId(String uniqueId) {
        return relatedNodeRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public RelatedNode createRelatedNode(Map<String, Object> nodeData) {
        RelatedNode node = new RelatedNode();
        node.setUniqueId(UuidUtil.generateUuid());
        node.setName((String) nodeData.get("name"));
        node.setParentId(nodeData.get("parentId") != null ? (String) nodeData.get("parentId") : "");
        node.setTags((List<String>) nodeData.get("tags"));
        node.setSoftDelete(false);
        node.setCreatedDate(LocalDateTime.now());
        node.setUpdatedDate(LocalDateTime.now());
        return relatedNodeRepository.save(node);
    }
    
    public RelatedNode updateRelatedNodeByUniqueId(String uniqueId, Map<String, Object> nodeData) {
        Optional<RelatedNode> optionalNode = relatedNodeRepository.findByUniqueId(uniqueId);
        if (optionalNode.isPresent()) {
            RelatedNode node = optionalNode.get();
            if (nodeData.containsKey("name")) node.setName((String) nodeData.get("name"));
            if (nodeData.containsKey("parentId")) node.setParentId((String) nodeData.get("parentId"));
            if (nodeData.containsKey("tags")) node.setTags((List<String>) nodeData.get("tags"));
            node.setUpdatedDate(LocalDateTime.now());
            return relatedNodeRepository.save(node);
        }
        return null;
    }
    
    public boolean deleteRelatedNodeByUniqueId(String uniqueId) {
        Optional<RelatedNode> optionalNode = relatedNodeRepository.findByUniqueId(uniqueId);
        if (optionalNode.isPresent()) {
            relatedNodeRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
}

