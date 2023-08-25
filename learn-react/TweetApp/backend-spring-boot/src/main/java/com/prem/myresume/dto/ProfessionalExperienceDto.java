package com.prem.myresume.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@EqualsAndHashCode(callSuper = false)
public class ProfessionalExperienceDto {
    private int sequenceNo;
    private String companyName;
    private String startDate;
    private String endDate;
    @Builder.Default
    private List<DesignationDto> designations= new ArrayList<>();
    private List<String> highlights;

    @Builder
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    @EqualsAndHashCode(callSuper = false)
    public static class DesignationDto {
        private String name;
        private String startDate;
        private String endDate;
    }
}
