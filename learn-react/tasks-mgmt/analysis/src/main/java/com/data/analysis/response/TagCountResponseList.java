package com.data.analysis.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagCountResponseList {

    private List<String> tagNames;
    private long totalCount;
}
