package com.p.spp.revision.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class RevisionRequest {
//    private String id;
    private String text;
    private String createdDate;
    private int revisionAfter;
}
