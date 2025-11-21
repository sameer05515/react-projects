package com.p.spp.revision.controller;

import com.p.spp.revision.dto.RevisionRequest;
import com.p.spp.revision.entity.Revision;
import com.p.spp.revision.service.RevisionService;
import com.p.spp.revision.utils.Constants;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RevisionController.class)
@DisplayName("RevisionController Unit Tests")
class RevisionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RevisionService revisionService;

    @Autowired
    private ObjectMapper objectMapper;

    private RevisionRequest revisionRequest;
    private Revision revision;

    @BeforeEach
    void setUp() {
        revisionRequest = RevisionRequest.builder()
                .text("Test revision text")
                .createdDate("2025-01-15")
                .revisionAfter(7)
                .build();

        revision = Revision.builder()
                .text("Test revision text")
                .createdDate(LocalDate.parse("2025-01-15", Constants.ddMMMyyyyDateFormatter))
                .revisionAfter(7)
                .revisionDates(List.of(LocalDate.of(2025, 1, 15)))
                .build();
        revision.setId("test-id");
    }

    @Test
    @DisplayName("POST /api/revisions - Should create revision")
    void save_WithValidRequest_ShouldReturnRevisionRequest() throws Exception {
        // Given
        when(revisionService.save(any(RevisionRequest.class))).thenReturn(revision);

        // When & Then
        mockMvc.perform(post("/api/revisions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(revisionRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.text").value("Test revision text"))
                .andExpect(jsonPath("$.revisionAfter").value(7))
                .andExpect(jsonPath("$.createdDate").value("2025-01-15"));
    }

    @Test
    @DisplayName("GET /api/revisions - Should return all revisions")
    void findAll_ShouldReturnListOfRevisions() throws Exception {
        // Given
        List<Revision> revisions = Arrays.asList(revision);
        when(revisionService.findAll()).thenReturn(revisions);

        // When & Then
        mockMvc.perform(get("/api/revisions"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].text").value("Test revision text"))
                .andExpect(jsonPath("$[0].revisionAfter").value(7));
    }

    @Test
    @DisplayName("GET /api/revisions/for-date - Should return revisions for specific date")
    void getRevisionsForDate_WithSpecificDate_ShouldReturnMatchingRevisions() throws Exception {
        // Given
        List<Revision> revisions = Arrays.asList(revision);
        when(revisionService.getRevisionsForDate("2025-01-15")).thenReturn(revisions);

        // When & Then
        mockMvc.perform(get("/api/revisions/for-date")
                        .param("targetDate", "2025-01-15"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].text").value("Test revision text"));
    }

    @Test
    @DisplayName("GET /api/revisions/for-date - Should return revisions for today when date not provided")
    void getRevisionsForDate_WithoutDate_ShouldUseCurrentDate() throws Exception {
        // Given
        List<Revision> revisions = Arrays.asList(revision);
        when(revisionService.getRevisionsForDate(null)).thenReturn(revisions);

        // When & Then
        mockMvc.perform(get("/api/revisions/for-date"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("PUT /api/revisions/generate-revisions-for-month - Should generate revisions successfully")
    void generateRevisionsForMonth_ShouldReturnSuccessMessage() throws Exception {
        // Given
        when(revisionService.generateRevisionsForMonth(2025, 2)).thenReturn(true);

        // When & Then
        mockMvc.perform(put("/api/revisions/generate-revisions-for-month")
                        .param("year", "2025")
                        .param("month", "2"))
                .andExpect(status().isOk())
                .andExpect(content().string("revision update started"));
    }

    @Test
    @DisplayName("PUT /api/revisions/generate-revisions-for-month - Should return error message on failure")
    void generateRevisionsForMonth_OnFailure_ShouldReturnErrorMessage() throws Exception {
        // Given
        when(revisionService.generateRevisionsForMonth(2025, 2)).thenReturn(false);

        // When & Then
        mockMvc.perform(put("/api/revisions/generate-revisions-for-month")
                        .param("year", "2025")
                        .param("month", "2"))
                .andExpect(status().isOk())
                .andExpect(content().string("error occurred"));
    }
}

