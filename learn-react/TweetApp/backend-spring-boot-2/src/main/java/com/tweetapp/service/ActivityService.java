package com.tweetapp.service;

import com.tweetapp.model.Activity;
import com.tweetapp.repository.ActivityRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ActivityService {
    
    @Autowired
    private ActivityRepository activityRepository;
    
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }
    
    public Activity getActivityByUniqueId(String uniqueId) {
        return activityRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public Activity createActivity(Map<String, Object> activityData) {
        Activity activity = new Activity();
        activity.setUniqueId(UuidUtil.generateUuid());
        activity.setType((String) activityData.get("type"));
        activity.setCreatedDate(LocalDateTime.now());
        activity.setUpdatedDate(LocalDateTime.now());
        return activityRepository.save(activity);
    }
    
    public Activity updateActivityByUniqueId(String uniqueId, Map<String, Object> activityData) {
        Optional<Activity> optionalActivity = activityRepository.findByUniqueId(uniqueId);
        if (optionalActivity.isPresent()) {
            Activity activity = optionalActivity.get();
            if (activityData.containsKey("type")) activity.setType((String) activityData.get("type"));
            activity.setUpdatedDate(LocalDateTime.now());
            return activityRepository.save(activity);
        }
        return null;
    }
    
    public boolean deleteActivityByUniqueId(String uniqueId) {
        Optional<Activity> optionalActivity = activityRepository.findByUniqueId(uniqueId);
        if (optionalActivity.isPresent()) {
            activityRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
}

