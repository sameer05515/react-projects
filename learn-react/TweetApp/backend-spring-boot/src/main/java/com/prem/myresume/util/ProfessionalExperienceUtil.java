package com.prem.myresume.util;

import com.prem.base.util.Convertible;
import com.prem.myresume.dto.ProfessionalExperienceDto;
import com.prem.myresume.dto.UserInfoDto;
import com.prem.myresume.entity.ProfessionalExperience;
import com.prem.myresume.entity.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProfessionalExperienceUtil
        implements Convertible<ProfessionalExperience, ProfessionalExperienceDto> {
    @Override
    public ProfessionalExperienceDto convertToResponse(ProfessionalExperience entity) {

        return ProfessionalExperienceDto.builder()
                .sequenceNo(entity.getSequenceNo())
                .companyName(entity.getCompanyName())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .highlights(entity.getHighlights())
                .designations(
                        null != entity.getDesignations()
                                ? entity.getDesignations().stream()
                                .map(
                                        d -> ProfessionalExperienceDto.DesignationDto.builder()
                                                .name(d.getName())
                                                .startDate(d.getStartDate())
                                                .endDate(d.getEndDate())
                                                .build()
                                )
                                .collect(Collectors.toList())
                                : null
                )
                .build();
    }

    @Override
    public ProfessionalExperience convertToEntity(ProfessionalExperienceDto dto) {

        return ProfessionalExperience.builder()
                .sequenceNo(dto.getSequenceNo())
                .companyName(dto.getCompanyName())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .highlights(dto.getHighlights())
                .designations(
                        null != dto.getDesignations()
                                ? dto.getDesignations().stream()
                                .map(
                                        d -> ProfessionalExperience.Designation.builder()
                                                .name(d.getName())
                                                .startDate(d.getStartDate())
                                                .endDate(d.getEndDate())
                                                .build()
                                )
                                .collect(Collectors.toList())
                                : null
                )
                .build();
    }
}
