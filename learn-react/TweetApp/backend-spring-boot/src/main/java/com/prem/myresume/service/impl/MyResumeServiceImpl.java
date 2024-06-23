package com.prem.myresume.service.impl;

import com.prem.base.exception.CustomErrorCode;
import com.prem.base.exception.CustomValidationException;
import com.prem.base.service.CommonService;
import com.prem.myresume.dto.MyResumeDto;
import com.prem.myresume.entity.MyResume;
import com.prem.myresume.repository.MyResumeRepository;
import com.prem.myresume.service.MyResumeService;
import com.prem.myresume.util.MyResumeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MyResumeServiceImpl implements MyResumeService {

    @Autowired
    private final MyResumeRepository myResumeRepository;

    @Autowired
    private final MyResumeUtil myResumeUtil;

    @Autowired
    private final CommonService commonService;

    @Override
    public List<MyResumeDto> upsertMyResumes(List<MyResumeDto> dtoList) {

        List<MyResume> myResumeList = dtoList.stream().map(myResumeDto -> convertToEntity(myResumeDto))
                .collect(Collectors.toList());
        myResumeList = myResumeRepository.saveAll(myResumeList);

        return myResumeList.stream()
                .map(myResumeUtil::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MyResumeDto getResumeByUniqueId(String uniqueId) {
        return myResumeRepository.findByUniqueId(uniqueId)
                .map(myResumeUtil::convertToResponse)
                .orElseThrow(() -> new CustomValidationException(CustomErrorCode.RESUME_NOT_FOUND, uniqueId));
    }

    private MyResume convertToEntity(MyResumeDto dto) {
        String uniqueId = dto.getUniqueId();
        return myResumeRepository.findByUniqueId(uniqueId)
                .map(existing -> {
                    if (!existing.getUniqueId().equals(uniqueId))
                        throw new CustomValidationException(CustomErrorCode.RESUME_EXISTS,
                                uniqueId);
                    myResumeUtil.updateEntity(existing, dto);
                    return existing;
                })
                .orElseGet(() -> {
                    dto.setUniqueId(commonService.getUniqueID("RESUME_"));
                    return myResumeUtil.convertToEntity(dto);
                });
    }
}
