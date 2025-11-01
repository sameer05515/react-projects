package com.prem.base.util;

public interface Convertible<ENTITY, DTO> {
    public DTO convertToResponse(ENTITY entity);

    public ENTITY convertToEntity(DTO dto);
}
