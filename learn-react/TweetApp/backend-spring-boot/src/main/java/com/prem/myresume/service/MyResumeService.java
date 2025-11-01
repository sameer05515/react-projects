package com.prem.myresume.service;

import com.prem.myresume.dto.MyResumeDto;
import java.util.List;

public interface MyResumeService {
    List<MyResumeDto> upsertMyResumes(List<MyResumeDto> dtoList);

    MyResumeDto getResumeByUniqueId(String uniqueId);
}
