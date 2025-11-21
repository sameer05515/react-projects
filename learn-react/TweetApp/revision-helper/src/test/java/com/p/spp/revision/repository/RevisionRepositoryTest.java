package com.p.spp.revision.repository;

import com.p.spp.revision.entity.Revision;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
@TestPropertySource(properties = {
        "spring.data.mongodb.uri=mongodb://localhost:27017/test-revision-db"
})
@DisplayName("RevisionRepository Integration Tests")
class RevisionRepositoryTest {

    @Autowired
    private RevisionRepository revisionRepository;

    private Revision revision1;
    private Revision revision2;

    @BeforeEach
    void setUp() {
        revisionRepository.deleteAll();

        LocalDate date1 = LocalDate.of(2025, 1, 15);
        LocalDate date2 = LocalDate.of(2025, 1, 22);
        LocalDate date3 = LocalDate.of(2025, 1, 29);

        revision1 = Revision.builder()
                .text("First revision")
                .createdDate(LocalDate.of(2025, 1, 10))
                .revisionAfter(7)
                .revisionDates(Arrays.asList(date1, date2, date3))
                .build();

        revision2 = Revision.builder()
                .text("Second revision")
                .createdDate(LocalDate.of(2025, 1, 5))
                .revisionAfter(14)
                .revisionDates(Arrays.asList(LocalDate.of(2025, 1, 19)))
                .build();

        revisionRepository.save(revision1);
        revisionRepository.save(revision2);
    }

    @Test
    @DisplayName("Should find revisions by date")
    void findByRevisionDatesContaining_WithExistingDate_ShouldReturnRevisions() {
        // Given
        LocalDate targetDate = LocalDate.of(2025, 1, 15);

        // When
        List<Revision> result = revisionRepository.findByRevisionDatesContaining(targetDate);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getText()).isEqualTo("First revision");
        assertThat(result.get(0).getRevisionDates()).contains(targetDate);
    }

    @Test
    @DisplayName("Should return empty list when no revisions found for date")
    void findByRevisionDatesContaining_WithNonExistingDate_ShouldReturnEmptyList() {
        // Given
        LocalDate targetDate = LocalDate.of(2025, 2, 1);

        // When
        List<Revision> result = revisionRepository.findByRevisionDatesContaining(targetDate);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("Should save and retrieve revision")
    void save_ShouldPersistRevision() {
        // Given
        Revision newRevision = Revision.builder()
                .text("New revision")
                .createdDate(LocalDate.now())
                .revisionAfter(5)
                .revisionDates(List.of(LocalDate.now()))
                .build();

        // When
        Revision saved = revisionRepository.save(newRevision);
        Revision found = revisionRepository.findById(saved.getId()).orElse(null);

        // Then
        assertThat(found).isNotNull();
        assertThat(found.getText()).isEqualTo("New revision");
        assertThat(found.getRevisionAfter()).isEqualTo(5);
    }

    @Test
    @DisplayName("Should find all revisions")
    void findAll_ShouldReturnAllRevisions() {
        // When
        List<Revision> result = revisionRepository.findAll();

        // Then
        assertThat(result).isNotNull();
        assertThat(result.size()).isGreaterThanOrEqualTo(2);
    }
}

