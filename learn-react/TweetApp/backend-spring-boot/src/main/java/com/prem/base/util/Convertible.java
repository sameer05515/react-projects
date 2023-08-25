package com.prem.base.util;

import com.prem.myresume.dto.MyResumeDto;
import com.prem.myresume.entity.MyResume;

public interface Convertible<ENTITY, DTO> {
    public DTO convertToResponse(ENTITY entity);

    public ENTITY convertToEntity(DTO dto);
}
