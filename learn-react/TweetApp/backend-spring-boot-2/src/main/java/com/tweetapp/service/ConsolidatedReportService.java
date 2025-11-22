package com.tweetapp.service;

import com.tweetapp.model.ConsolidatedReport;
import com.tweetapp.repository.ConsolidatedReportRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ConsolidatedReportService {
    
    @Autowired
    private ConsolidatedReportRepository consolidatedReportRepository;
    
    public List<ConsolidatedReport> getAllReports() {
        return consolidatedReportRepository.findAll();
    }
    
    public ConsolidatedReport getReportByUniqueId(String uniqueId) {
        return consolidatedReportRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public ConsolidatedReport createReport(Map<String, Object> reportData) {
        ConsolidatedReport report = new ConsolidatedReport();
        report.setUniqueId(UuidUtil.generateUuid());
        report.setName((String) reportData.get("name"));
        report.setDescription((String) reportData.get("description"));
        report.setCreatedDate(LocalDateTime.now());
        report.setUpdatedDate(LocalDateTime.now());
        return consolidatedReportRepository.save(report);
    }
    
    public ConsolidatedReport updateReportByUniqueId(String uniqueId, Map<String, Object> reportData) {
        Optional<ConsolidatedReport> optionalReport = consolidatedReportRepository.findByUniqueId(uniqueId);
        if (optionalReport.isPresent()) {
            ConsolidatedReport report = optionalReport.get();
            if (reportData.containsKey("name")) report.setName((String) reportData.get("name"));
            if (reportData.containsKey("description")) report.setDescription((String) reportData.get("description"));
            report.setUpdatedDate(LocalDateTime.now());
            return consolidatedReportRepository.save(report);
        }
        return null;
    }
    
    public boolean deleteReportByUniqueId(String uniqueId) {
        Optional<ConsolidatedReport> optionalReport = consolidatedReportRepository.findByUniqueId(uniqueId);
        if (optionalReport.isPresent()) {
            consolidatedReportRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
}

