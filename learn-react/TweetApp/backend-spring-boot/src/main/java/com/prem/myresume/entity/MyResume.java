package com.prem.myresume.entity;

import com.prem.base.entity.AuditableEntity;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "my_resume_v2")
public class MyResume extends AuditableEntity {
    @Column(unique = true)
    @Field("uniqueId")
    private String uniqueId;

    @Field("linkedUserInfo")
    private UserInfo linkedUserInfo;

    @Field("expertiseSet")
    private List<String> expertiseSet;

    @Field("professionalExperience")
    private List<ProfessionalExperience> professionalExperience;

    @Builder
    public MyResume(
            ObjectId id,
            String createdBy,
            LocalDateTime createdDate,
            String lastModifiedBy,
            LocalDateTime lastModifiedDate,
            String tenantId,
            boolean softDelete,
            String uniqueId,
            UserInfo linkedUserInfo,
            List<String> expertiseSet,
            List<ProfessionalExperience> professionalExperience
    ){
        super(
                id,
                createdBy,
                createdDate,
                lastModifiedBy,
                lastModifiedDate,
                tenantId,
                softDelete
        );
        this.uniqueId = uniqueId;
        this.linkedUserInfo = linkedUserInfo;
        this.expertiseSet = expertiseSet;
        this.professionalExperience = professionalExperience;
    }
}
