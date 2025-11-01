package com.p.spp.revision.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("RevisionRequest DTO Tests")
class RevisionRequestTest {

    @Test
    @DisplayName("Should create request with builder")
    void builder_ShouldCreateRequest() {
        // When
        RevisionRequest request = RevisionRequest.builder()
                .text("Test text")
                .createdDate("2025-01-15")
                .revisionAfter(7)
                .build();

        // Then
        assertThat(request).isNotNull();
        assertThat(request.getText()).isEqualTo("Test text");
        assertThat(request.getCreatedDate()).isEqualTo("2025-01-15");
        assertThat(request.getRevisionAfter()).isEqualTo(7);
    }

    @Test
    @DisplayName("Should have setters and getters")
    void settersAndGetters_ShouldWork() {
        // Given
        RevisionRequest request = RevisionRequest.builder()
                .text("Initial text")
                .createdDate("2025-01-01")
                .revisionAfter(5)
                .build();

        // When
        request.setText("Test text");
        request.setCreatedDate("2025-01-15");
        request.setRevisionAfter(7);

        // Then
        assertThat(request.getText()).isEqualTo("Test text");
        assertThat(request.getCreatedDate()).isEqualTo("2025-01-15");
        assertThat(request.getRevisionAfter()).isEqualTo(7);
    }

    @Test
    @DisplayName("Should support equals and hashCode")
    void equalsAndHashCode_ShouldWork() {
        // Given
        RevisionRequest request1 = RevisionRequest.builder()
                .text("Test")
                .createdDate("2025-01-15")
                .revisionAfter(7)
                .build();

        RevisionRequest request2 = RevisionRequest.builder()
                .text("Test")
                .createdDate("2025-01-15")
                .revisionAfter(7)
                .build();

        // When & Then
        assertThat(request1).isEqualTo(request2);
        assertThat(request1.hashCode()).isEqualTo(request2.hashCode());
    }
}

