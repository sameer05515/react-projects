package com.data.analysis.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagCountResponse {

    private String tagName;
    private long totalCount;
}
