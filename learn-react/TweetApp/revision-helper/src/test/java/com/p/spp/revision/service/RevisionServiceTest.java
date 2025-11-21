package com.p.spp.revision.service;

import com.p.spp.revision.dto.RevisionRequest;
import com.p.spp.revision.entity.Revision;
import com.p.spp.revision.repository.RevisionRepository;
import com.p.spp.revision.utils.Constants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("RevisionService Unit Tests")
class RevisionServiceTest {

    @Mock
    private RevisionRepository revisionRepository;

    @InjectMocks
    private RevisionService revisionService;

    private RevisionRequest revisionRequest;
    private Revision savedRevision;

    @BeforeEach
    void setUp() {
        revisionRequest = RevisionRequest.builder()
                .text("Test revision text")
                .createdDate("2025-01-15")
                .revisionAfter(7)
                .build();

        savedRevision = Revision.builder()
                .text("Test revision text")
                .createdDate(LocalDate.parse("2025-01-15", Constants.ddMMMyyyyDateFormatter))
                .revisionAfter(7)
                .revisionDates(List.of(LocalDate.of(2025, 1, 15)))
                .build();
        savedRevision.setId("test-id");
    }

    @Test
    @DisplayName("Should save revision with provided date")
    void save_WithProvidedDate_ShouldReturnSavedRevision() {
        // Given
        when(revisionRepository.save(any(Revision.class))).thenReturn(savedRevision);

        // When
        Revision result = revisionService.save(revisionRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getText()).isEqualTo("Test revision text");
        assertThat(result.getCreatedDate()).isEqualTo(LocalDate.parse("2025-01-15", Constants.ddMMMyyyyDateFormatter));
        assertThat(result.getRevisionAfter()).isEqualTo(7);
        verify(revisionRepository, times(1)).save(any(Revision.class));
    }

    @Test
    @DisplayName("Should save revision with current date when createdDate is null")
    void save_WithNullCreatedDate_ShouldUseCurrentDate() {
        // Given
        revisionRequest.setCreatedDate(null);
        LocalDate expectedDate = LocalDate.now();
        Revision revisionWithCurrentDate = Revision.builder()
                .text("Test revision text")
                .createdDate(expectedDate)
                .revisionAfter(7)
                .revisionDates(List.of(expectedDate))
                .build();
        when(revisionRepository.save(any(Revision.class))).thenReturn(revisionWithCurrentDate);

        // When
        Revision result = revisionService.save(revisionRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getCreatedDate()).isEqualTo(expectedDate);
        verify(revisionRepository, times(1)).save(any(Revision.class));
    }

    @Test
    @DisplayName("Should save revision with current date when createdDate is blank")
    void save_WithBlankCreatedDate_ShouldUseCurrentDate() {
        // Given
        revisionRequest.setCreatedDate("   ");
        LocalDate expectedDate = LocalDate.now();
        Revision revisionWithCurrentDate = Revision.builder()
                .text("Test revision text")
                .createdDate(expectedDate)
                .revisionAfter(7)
                .revisionDates(List.of(expectedDate))
                .build();
        when(revisionRepository.save(any(Revision.class))).thenReturn(revisionWithCurrentDate);

        // When
        Revision result = revisionService.save(revisionRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getCreatedDate()).isEqualTo(expectedDate);
        verify(revisionRepository, times(1)).save(any(Revision.class));
    }

    @Test
    @DisplayName("Should find all revisions")
    void findAll_ShouldReturnAllRevisions() {
        // Given
        List<Revision> revisions = Arrays.asList(savedRevision);
        when(revisionRepository.findAll()).thenReturn(revisions);

        // When
        List<Revision> result = revisionService.findAll();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getText()).isEqualTo("Test revision text");
        verify(revisionRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should get revisions for specific date")
    void getRevisionsForDate_WithSpecificDate_ShouldReturnMatchingRevisions() {
        // Given
        LocalDate targetDate = LocalDate.of(2025, 1, 15);
        List<Revision> revisions = Arrays.asList(savedRevision);
        when(revisionRepository.findByRevisionDatesContaining(targetDate)).thenReturn(revisions);

        // When
        List<Revision> result = revisionService.getRevisionsForDate("2025-01-15");

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        verify(revisionRepository, times(1)).findByRevisionDatesContaining(targetDate);
    }

    @Test
    @DisplayName("Should get revisions for today when date is null")
    void getRevisionsForDate_WithNullDate_ShouldUseCurrentDate() {
        // Given
        LocalDate today = LocalDate.now();
        List<Revision> revisions = Arrays.asList(savedRevision);
        when(revisionRepository.findByRevisionDatesContaining(today)).thenReturn(revisions);

        // When
        List<Revision> result = revisionService.getRevisionsForDate(null);

        // Then
        assertThat(result).isNotNull();
        verify(revisionRepository, times(1)).findByRevisionDatesContaining(today);
    }

    @Test
    @DisplayName("Should generate revisions for month")
    void generateRevisionsForMonth_ShouldUpdateAllRevisions() {
        // Given
        List<Revision> revisions = Arrays.asList(savedRevision);
        when(revisionRepository.findAll()).thenReturn(revisions);
        when(revisionRepository.save(any(Revision.class))).thenReturn(savedRevision);

        // When
        boolean result = revisionService.generateRevisionsForMonth(2025, 2);

        // Then
        assertThat(result).isTrue();
        verify(revisionRepository, times(1)).findAll();
        verify(revisionRepository, times(1)).save(any(Revision.class));
    }

    @Test
    @DisplayName("Should handle empty revision list when generating for month")
    void generateRevisionsForMonth_WithEmptyList_ShouldReturnTrue() {
        // Given
        when(revisionRepository.findAll()).thenReturn(List.of());

        // When
        boolean result = revisionService.generateRevisionsForMonth(2025, 2);

        // Then
        assertThat(result).isTrue();
        verify(revisionRepository, times(1)).findAll();
        verify(revisionRepository, never()).save(any(Revision.class));
    }
}

