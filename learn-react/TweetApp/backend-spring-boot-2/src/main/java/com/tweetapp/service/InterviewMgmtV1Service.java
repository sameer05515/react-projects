package com.tweetapp.service;

import com.tweetapp.model.InterviewCategory;
import com.tweetapp.repository.InterviewCategoryRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class InterviewMgmtV1Service {
    
    @Autowired
    private InterviewCategoryRepository interviewCategoryRepository;
    
    public List<InterviewCategory> getAllCategories() {
        return interviewCategoryRepository.findAll();
    }
    
    public InterviewCategory getCategoryByUniqueId(String uniqueId) {
        return interviewCategoryRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public InterviewCategory createCategory(Map<String, Object> categoryData) {
        InterviewCategory category = new InterviewCategory();
        category.setUniqueId(UuidUtil.generateUuid());
        category.setCategoryName((String) categoryData.get("categoryName"));
        category.setTitle((String) categoryData.get("title"));
        category.setParentId(categoryData.get("parentId") != null ? (String) categoryData.get("parentId") : "");
        return interviewCategoryRepository.save(category);
    }
    
    public InterviewCategory updateCategoryByUniqueId(String uniqueId, Map<String, Object> categoryData) {
        Optional<InterviewCategory> optionalCategory = interviewCategoryRepository.findByUniqueId(uniqueId);
        if (optionalCategory.isPresent()) {
            InterviewCategory category = optionalCategory.get();
            if (categoryData.containsKey("categoryName")) category.setCategoryName((String) categoryData.get("categoryName"));
            if (categoryData.containsKey("title")) category.setTitle((String) categoryData.get("title"));
            if (categoryData.containsKey("parentId")) category.setParentId((String) categoryData.get("parentId"));
            return interviewCategoryRepository.save(category);
        }
        return null;
    }
    
    public boolean deleteCategoryByUniqueId(String uniqueId) {
        Optional<InterviewCategory> optionalCategory = interviewCategoryRepository.findByUniqueId(uniqueId);
        if (optionalCategory.isPresent()) {
            interviewCategoryRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
}

