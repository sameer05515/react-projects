package com.tweetapp.service;

import com.tweetapp.model.PinnedItem;
import com.tweetapp.repository.PinnedItemRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PinnedItemService {
    
    @Autowired
    private PinnedItemRepository pinnedItemRepository;
    
    public List<PinnedItem> getAllPinnedItems() {
        return pinnedItemRepository.findAll();
    }
    
    public PinnedItem getPinnedItemByUniqueId(String uniqueId) {
        return pinnedItemRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public PinnedItem createPinnedItem(Map<String, Object> pinnedItemData) {
        PinnedItem pinnedItem = new PinnedItem();
        pinnedItem.setUniqueId(UuidUtil.generateUuid());
        pinnedItem.setLinkedUniqueId((String) pinnedItemData.get("linkedUniqueId"));
        pinnedItem.setLinkedItemType((String) pinnedItemData.get("linkedItemType"));
        pinnedItem.setSoftDelete(false);
        pinnedItem.setCreatedDate(LocalDateTime.now());
        pinnedItem.setUpdatedDate(LocalDateTime.now());
        return pinnedItemRepository.save(pinnedItem);
    }
    
    public PinnedItem updatePinnedItemByUniqueId(String uniqueId, Map<String, Object> pinnedItemData) {
        Optional<PinnedItem> optionalPinnedItem = pinnedItemRepository.findByUniqueId(uniqueId);
        if (optionalPinnedItem.isPresent()) {
            PinnedItem pinnedItem = optionalPinnedItem.get();
            if (pinnedItemData.containsKey("linkedUniqueId")) pinnedItem.setLinkedUniqueId((String) pinnedItemData.get("linkedUniqueId"));
            if (pinnedItemData.containsKey("linkedItemType")) pinnedItem.setLinkedItemType((String) pinnedItemData.get("linkedItemType"));
            pinnedItem.setUpdatedDate(LocalDateTime.now());
            return pinnedItemRepository.save(pinnedItem);
        }
        return null;
    }
    
    public boolean deletePinnedItemByUniqueId(String uniqueId) {
        Optional<PinnedItem> optionalPinnedItem = pinnedItemRepository.findByUniqueId(uniqueId);
        if (optionalPinnedItem.isPresent()) {
            pinnedItemRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
}

