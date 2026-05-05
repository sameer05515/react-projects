package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "myresumemodels")
public class MyResume {
    @Id
    private String id;
    
    private String uniqueName;
    private UserInfo linkedUserInfo;
    private List<String> expertiseSet;
    private List<ProfessionalExperience> professionalExperience;
    
    @CreatedDate
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInfo {
        private String name;
        private String email;
        private String phone;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProfessionalExperience {
        private Integer sequenceNo;
        private String companyName;
        private String startDate;
        private String endDate;
        private List<Designation> designations;
        private List<String> highlights;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Designation {
            private String name;
            private String startDate;
            private String endDate;
        }
    }
}

