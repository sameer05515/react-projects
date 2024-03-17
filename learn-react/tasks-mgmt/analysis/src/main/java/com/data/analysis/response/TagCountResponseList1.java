package com.data.analysis.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TagCountResponseList1 {
    public String getId() {
        return id;
    }

    @Id
    private String id;
    private long totalCount;
}
