package com.tweetapp.service;

import com.tweetapp.model.ThinkTankItem;
import com.tweetapp.repository.ThinkTankItemRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ThinkTankService {
    
    @Autowired
    private ThinkTankItemRepository thinkTankItemRepository;
    
    public List<ThinkTankItem> getAllThinkTankItems() {
        return thinkTankItemRepository.findAll();
    }
    
    public ThinkTankItem getThinkTankItemByUniqueId(String uniqueId) {
        return thinkTankItemRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public ThinkTankItem createThinkTankItem(Map<String, Object> itemData) {
        ThinkTankItem item = new ThinkTankItem();
        item.setUniqueId(UuidUtil.generateUuid());
        item.setStatus(itemData.get("status") != null ? (String) itemData.get("status") : "Open");
        item.setIsUrgent(itemData.get("isUrgent") != null ? (Boolean) itemData.get("isUrgent") : false);
        item.setIsImportant(itemData.get("isImportant") != null ? (Boolean) itemData.get("isImportant") : false);
        item.setHasGroomed(itemData.get("hasGroomed") != null ? (Boolean) itemData.get("hasGroomed") : false);
        item.setItemType(itemData.get("itemType") != null ? (String) itemData.get("itemType") : "to-do");
        item.setCreatedDate(LocalDateTime.now());
        return thinkTankItemRepository.save(item);
    }
    
    public ThinkTankItem updateThinkTankItemByUniqueId(String uniqueId, Map<String, Object> itemData) {
        Optional<ThinkTankItem> optionalItem = thinkTankItemRepository.findByUniqueId(uniqueId);
        if (optionalItem.isPresent()) {
            ThinkTankItem item = optionalItem.get();
            if (itemData.containsKey("status")) item.setStatus((String) itemData.get("status"));
            if (itemData.containsKey("isUrgent")) item.setIsUrgent((Boolean) itemData.get("isUrgent"));
            if (itemData.containsKey("isImportant")) item.setIsImportant((Boolean) itemData.get("isImportant"));
            if (itemData.containsKey("hasGroomed")) item.setHasGroomed((Boolean) itemData.get("hasGroomed"));
            if (itemData.containsKey("itemType")) item.setItemType((String) itemData.get("itemType"));
            return thinkTankItemRepository.save(item);
        }
        return null;
    }
    
    public boolean deleteThinkTankItemByUniqueId(String uniqueId) {
        Optional<ThinkTankItem> optionalItem = thinkTankItemRepository.findByUniqueId(uniqueId);
        if (optionalItem.isPresent()) {
            thinkTankItemRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
    
    public Map<String, Object> getStatistics() {
        List<ThinkTankItem> allItems = thinkTankItemRepository.findAll();
        long openCount = allItems.stream().filter(item -> "Open".equals(item.getStatus())).count();
        long closedCount = allItems.stream().filter(item -> "Closed".equals(item.getStatus())).count();
        long urgentCount = allItems.stream().filter(ThinkTankItem::getIsUrgent).count();
        long importantCount = allItems.stream().filter(ThinkTankItem::getIsImportant).count();
        
        return Map.of(
            "totalItems", allItems.size(),
            "openCount", openCount,
            "closedCount", closedCount,
            "urgentCount", urgentCount,
            "importantCount", importantCount
        );
    }
}

