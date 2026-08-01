package com.iqms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Version;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Base class for every JPA entity in IQMS.
 *
 * <p>Centralizes the conventions mandated by the coding standards:</p>
 * <ul>
 *     <li><b>UUID primary keys</b> — generated at persist time via Hibernate's
 *     {@link UuidGenerator}, avoiding sequence coordination across environments.</li>
 *     <li><b>Auditing</b> — {@code createdDate}/{@code updatedDate}/{@code createdBy}/
 *     {@code updatedBy} are populated automatically by Spring Data's
 *     {@link AuditingEntityListener}, backed by the {@code auditorAware} bean.</li>
 *     <li><b>Soft delete</b> — {@code deleted} flags a row as removed without a
 *     physical {@code DELETE}, preserving referential and historical integrity.</li>
 *     <li><b>Optimistic locking</b> — {@code version} prevents lost updates when
 *     two clients edit the same row concurrently.</li>
 * </ul>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Getter
@Setter
@MappedSuperclass
@EqualsAndHashCode(of = "id")
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity implements Serializable {

    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false, length = 36)
    private UUID id;

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @CreatedBy
    @Column(name = "created_by", updatable = false, length = 100)
    private String createdBy;

    @LastModifiedBy
    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    @Column(name = "is_deleted", nullable = false)
    private boolean deleted = false;

    @Column(name = "deleted_date")
    private LocalDateTime deletedDate;

    /** Optimistic-locking token; incremented by Hibernate on every update. */
    @Version
    @Column(name = "version", nullable = false)
    @JsonIgnore
    private Long version = 0L;

    /**
     * Marks this entity as soft-deleted, stamping the deletion timestamp.
     * Callers are still responsible for persisting the change.
     */
    public void markDeleted() {
        this.deleted = true;
        this.deletedDate = LocalDateTime.now();
    }
}
