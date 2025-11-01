package com.p.spp.revision.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("RevisionResponse DTO Tests")
class RevisionResponseTest {

    @Test
    @DisplayName("Should create response with builder")
    void builder_ShouldCreateResponse() {
        // Given
        LocalDate createdDate = LocalDate.of(2025, 1, 15);

        // When
        RevisionResponse response = RevisionResponse.builder()
                .id("test-id")
                .text("Test text")
                .createdDate(createdDate)
                .revisionAfter(7)
                .build();

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo("test-id");
        assertThat(response.getText()).isEqualTo("Test text");
        assertThat(response.getCreatedDate()).isEqualTo(createdDate);
        assertThat(response.getRevisionAfter()).isEqualTo(7);
    }

    @Test
    @DisplayName("Should have setters and getters")
    void settersAndGetters_ShouldWork() {
        // Given
        LocalDate initialDate = LocalDate.of(2025, 1, 1);
        RevisionResponse response = RevisionResponse.builder()
                .id("initial-id")
                .text("Initial text")
                .createdDate(initialDate)
                .revisionAfter(5)
                .build();
        LocalDate createdDate = LocalDate.of(2025, 1, 15);

        // When
        response.setId("test-id");
        response.setText("Test text");
        response.setCreatedDate(createdDate);
        response.setRevisionAfter(7);

        // Then
        assertThat(response.getId()).isEqualTo("test-id");
        assertThat(response.getText()).isEqualTo("Test text");
        assertThat(response.getCreatedDate()).isEqualTo(createdDate);
        assertThat(response.getRevisionAfter()).isEqualTo(7);
    }

    @Test
    @DisplayName("Should support equals and hashCode")
    void equalsAndHashCode_ShouldWork() {
        // Given
        LocalDate createdDate = LocalDate.of(2025, 1, 15);

        RevisionResponse response1 = RevisionResponse.builder()
                .id("test-id")
                .text("Test")
                .createdDate(createdDate)
                .revisionAfter(7)
                .build();

        RevisionResponse response2 = RevisionResponse.builder()
                .id("test-id")
                .text("Test")
                .createdDate(createdDate)
                .revisionAfter(7)
                .build();

        // When & Then
        assertThat(response1).isEqualTo(response2);
        assertThat(response1.hashCode()).isEqualTo(response2.hashCode());
    }
}

