package com.prem.myresume.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@NoArgsConstructor
@Data
public class ProfessionalExperience {

    @Field("sequenceNo")
    private int sequenceNo;

    @Field("companyName")
    private String companyName;

    @Field("startDate")
    private String startDate;

    @Field("endDate")
    private String endDate;

    @Field("designations")
    private List<Designation> designations;

    @Field("highlights")
    private List<String> highlights;

    @NoArgsConstructor
    @Data
    public static class Designation {

        @Field("name")
        private String name;

        @Field("startDate")
        private String startDate;

        @Field("endDate")
        private String endDate;

        @Builder
        public Designation(
                String name,
                String startDate,
                String endDate
        ){
            this.name= name;
            this.startDate= startDate;
            this.endDate= endDate;
        }
    }

    @Builder
    public ProfessionalExperience(
            int sequenceNo,
            String companyName,
            String startDate,
            String endDate,
            List<Designation> designations,
            List<String> highlights
    ){
        this.sequenceNo= sequenceNo;
        this.companyName= companyName;
        this.startDate= startDate;
        this.endDate= endDate;
        this.designations= designations;
        this.highlights= highlights;
    }

}
