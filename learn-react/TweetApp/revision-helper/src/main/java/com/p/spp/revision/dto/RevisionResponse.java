package com.p.spp.revision.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class RevisionResponse {
    private String id;
    private String text;
    private LocalDate createdDate;
    private int revisionAfter;
}
