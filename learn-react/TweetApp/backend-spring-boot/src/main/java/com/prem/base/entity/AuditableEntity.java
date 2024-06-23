package com.prem.base.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public abstract class AuditableEntity {

  @Id
  @Field("id")
  protected ObjectId id;

  @CreatedBy
  @Field("createdBy")
  protected String createdBy;

  @CreatedDate
  @Field("createdDate")
  protected LocalDateTime createdDate;

  @LastModifiedBy
  @Field("lastModifiedBy")
  protected String lastModifiedBy;

  @LastModifiedDate
  @Field("lastModifiedDate")
  protected LocalDateTime lastModifiedDate;

  @Indexed
  @Field("tenantId")
  private String tenantId;

  @Field("softDelete")
  private boolean softDelete;
}
