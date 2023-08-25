package com.prem.myresume.util;

import com.prem.base.util.Convertible;
import com.prem.base.util.Updatable;
import com.prem.myresume.dto.MyResumeDto;
import com.prem.myresume.entity.MyResume;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MyResumeUtil implements Convertible<MyResume, MyResumeDto>,
        Updatable<MyResume, MyResumeDto> {

    @Autowired
    private UserInfoUtil userInfoUtil;

    @Autowired
    private ProfessionalExperienceUtil professionalExperienceUtil;

    @Override
    public MyResumeDto convertToResponse(MyResume entity) {
        return MyResumeDto.builder()
                .createdBy(entity.getCreatedBy())
                .createdDate(entity.getCreatedDate())
                .lastModifiedBy(entity.getLastModifiedBy())
                .lastModifiedDate(entity.getLastModifiedDate())
                .softDelete(entity.isSoftDelete())
                .uniqueId(entity.getUniqueId())
                .expertiseSet(entity.getExpertiseSet())
                .linkedUserInfo(
                        null != entity.getLinkedUserInfo()
                                ? userInfoUtil.convertToResponse(entity.getLinkedUserInfo())
                                : null
                )
                .professionalExperience(
                        null != entity.getProfessionalExperience()
                                ? entity.getProfessionalExperience().stream()
                                .map(p -> professionalExperienceUtil.convertToResponse(p))
                                .collect(Collectors.toList())
                                : new ArrayList<>()
                )
                .build();
    }

    @Override
    public MyResume convertToEntity(MyResumeDto dto) {
        return MyResume.builder()
                .uniqueId(dto.getUniqueId())
                .expertiseSet(dto.getExpertiseSet())
                .professionalExperience(
                        null != dto.getProfessionalExperience()
                                ? dto.getProfessionalExperience().stream()
                                .map(p -> professionalExperienceUtil.convertToEntity(p))
                                .collect(Collectors.toList())
                                : null
                )
                .linkedUserInfo(
                        null != dto.getLinkedUserInfo()
                                ? userInfoUtil.convertToEntity(dto.getLinkedUserInfo())
                                : null
                )
                .build();
    }

    @Override
    public MyResume updateEntity(MyResume existingEntity, MyResumeDto dto) {
        existingEntity.setLinkedUserInfo(
                null != dto.getLinkedUserInfo()
                        ? userInfoUtil.convertToEntity(dto.getLinkedUserInfo())
                        : existingEntity.getLinkedUserInfo()
        );
        existingEntity.setProfessionalExperience(
                null != dto.getProfessionalExperience()
                        ? dto.getProfessionalExperience().stream()
                        .map(p -> professionalExperienceUtil.convertToEntity(p))
                        .collect(Collectors.toList())
                        : existingEntity.getProfessionalExperience()
        );
        return existingEntity;
    }
}
