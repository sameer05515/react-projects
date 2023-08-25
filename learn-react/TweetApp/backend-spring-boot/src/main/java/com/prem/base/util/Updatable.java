package com.prem.base.util;

public interface Updatable<ENTITY, DTO> {
    public ENTITY updateEntity(ENTITY existingEntity, DTO dto);
}
