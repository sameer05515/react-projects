package com.prem.myresume.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@EqualsAndHashCode(callSuper = false)
public class MyResumeDto {
    /** AuditableEntity fields */
    private String id;
    private String createdBy;
    private LocalDateTime createdDate;
    private String lastModifiedBy;
    private LocalDateTime lastModifiedDate;
    private boolean softDelete;


    /** MyResumeDto fields*/
    private String uniqueId;
    private UserInfoDto linkedUserInfo;
    private List<String> expertiseSet;
    private List<ProfessionalExperienceDto> professionalExperience;

}
