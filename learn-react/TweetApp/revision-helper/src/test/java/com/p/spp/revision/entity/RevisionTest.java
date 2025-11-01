package com.p.spp.revision.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Revision Entity Tests")
class RevisionTest {

    @Test
    @DisplayName("Should create revision with builder")
    void builder_ShouldCreateRevision() {
        // Given
        LocalDate createdDate = LocalDate.of(2025, 1, 15);
        List<LocalDate> revisionDates = Arrays.asList(
                LocalDate.of(2025, 1, 15),
                LocalDate.of(2025, 1, 22)
        );

        // When
        Revision revision = Revision.builder()
                .text("Test text")
                .createdDate(createdDate)
                .revisionAfter(7)
                .revisionDates(revisionDates)
                .build();

        // Then
        assertThat(revision).isNotNull();
        assertThat(revision.getText()).isEqualTo("Test text");
        assertThat(revision.getCreatedDate()).isEqualTo(createdDate);
        assertThat(revision.getRevisionAfter()).isEqualTo(7);
        assertThat(revision.getRevisionDates()).hasSize(2);
        assertThat(revision.getRevisionDates()).containsAll(revisionDates);
    }

    @Test
    @DisplayName("Should have setters and getters")
    void settersAndGetters_ShouldWork() {
        // Given
        Revision revision = Revision.builder()
                .text("Test text")
                .createdDate(LocalDate.now())
                .revisionAfter(7)
                .revisionDates(Arrays.asList(LocalDate.now()))
                .build();
        String id = "test-id";
        String text = "Updated text";
        LocalDate createdDate = LocalDate.of(2025, 2, 1);
        int revisionAfter = 14;
        List<LocalDate> revisionDates = Arrays.asList(LocalDate.of(2025, 2, 1));

        // When
        revision.setId(id);
        revision.setText(text);
        revision.setCreatedDate(createdDate);
        revision.setRevisionAfter(revisionAfter);
        revision.setRevisionDates(revisionDates);

        // Then
        assertThat(revision.getId()).isEqualTo(id);
        assertThat(revision.getText()).isEqualTo(text);
        assertThat(revision.getCreatedDate()).isEqualTo(createdDate);
        assertThat(revision.getRevisionAfter()).isEqualTo(revisionAfter);
        assertThat(revision.getRevisionDates()).isEqualTo(revisionDates);
    }

    @Test
    @DisplayName("Should support equals and hashCode")
    void equalsAndHashCode_ShouldWork() {
        // Given
        LocalDate createdDate = LocalDate.of(2025, 1, 15);
        List<LocalDate> revisionDates = Arrays.asList(createdDate);

        Revision revision1 = Revision.builder()
                .text("Test")
                .createdDate(createdDate)
                .revisionAfter(7)
                .revisionDates(revisionDates)
                .build();

        Revision revision2 = Revision.builder()
                .text("Test")
                .createdDate(createdDate)
                .revisionAfter(7)
                .revisionDates(revisionDates)
                .build();

        // When & Then
        assertThat(revision1).isEqualTo(revision2);
        assertThat(revision1.hashCode()).isEqualTo(revision2.hashCode());
    }

    @Test
    @DisplayName("Should generate toString")
    void toString_ShouldContainFields() {
        // Given
        Revision revision = Revision.builder()
                .text("Test text")
                .createdDate(LocalDate.of(2025, 1, 15))
                .revisionAfter(7)
                .revisionDates(Arrays.asList(LocalDate.of(2025, 1, 15)))
                .build();

        // When
        String toString = revision.toString();

        // Then
        assertThat(toString).contains("Test text");
        assertThat(toString).contains("7");
    }
}

