package com.tweetapp.service;

import com.tweetapp.model.MyResume;
import com.tweetapp.repository.MyResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MyResumeService {
    
    @Autowired
    private MyResumeRepository myResumeRepository;
    
    public List<MyResume> getAllResumes() {
        return myResumeRepository.findAll();
    }
    
    public MyResume getResumeByUniqueName(String uniqueName) {
        return myResumeRepository.findByUniqueName(uniqueName).orElse(null);
    }
    
    public MyResume createResume(Map<String, Object> resumeData) {
        MyResume resume = new MyResume();
        resume.setUniqueName((String) resumeData.get("uniqueName"));
        resume.setCreatedDate(LocalDateTime.now());
        resume.setLastModifiedDate(LocalDateTime.now());
        // Map other fields from resumeData
        return myResumeRepository.save(resume);
    }
    
    public MyResume updateResume(String uniqueName, Map<String, Object> resumeData) {
        Optional<MyResume> optionalResume = myResumeRepository.findByUniqueName(uniqueName);
        if (optionalResume.isPresent()) {
            MyResume resume = optionalResume.get();
            // Update fields from resumeData
            resume.setLastModifiedDate(LocalDateTime.now());
            return myResumeRepository.save(resume);
        }
        return null;
    }
    
    public boolean deleteResume(String uniqueName) {
        Optional<MyResume> optionalResume = myResumeRepository.findByUniqueName(uniqueName);
        if (optionalResume.isPresent()) {
            myResumeRepository.delete(optionalResume.get());
            return true;
        }
        return false;
    }
}

