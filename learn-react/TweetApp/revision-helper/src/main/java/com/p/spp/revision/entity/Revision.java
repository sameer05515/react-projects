package com.p.spp.revision.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Document

public class Revision {
    @Id
    private String id;
    private String text;
    private LocalDate createdDate;
    private int revisionAfter;
    private List<LocalDate> revisionDates; // pre-calculated due dates


    @Builder
    public Revision(String text,LocalDate createdDate,int revisionAfter,List<LocalDate> revisionDates){
        this.createdDate=createdDate;
        this.revisionAfter=revisionAfter;
        this.text=text;
        this.revisionDates=revisionDates;
    }
}
