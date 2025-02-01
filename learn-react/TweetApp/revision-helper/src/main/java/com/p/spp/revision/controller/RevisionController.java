package com.p.spp.revision.controller;

import com.p.spp.revision.dto.RevisionRequest;
import com.p.spp.revision.dto.RevisionResponse;
import com.p.spp.revision.entity.Revision;
import com.p.spp.revision.service.RevisionService;
import com.p.spp.revision.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/revisions")
@RequiredArgsConstructor
public class RevisionController {

    private final RevisionService revisionService;


    @PostMapping
    public RevisionRequest save(@RequestBody RevisionRequest request) {
        Revision revision = revisionService.save(request);
        return RevisionRequest.builder()
                .text(revision.getText())
                .revisionAfter(revision.getRevisionAfter())
                .createdDate(revision.getCreatedDate().format(Constants.ddMMMyyyyDateFormatter))
                .build();
    }

    @GetMapping
    public List<RevisionResponse> findAll() {
        return revisionService.findAll().stream()
                .map(revision -> RevisionResponse.builder()
                        .id(revision.getId())
                        .text(revision.getText())
                        .revisionAfter(revision.getRevisionAfter())
                        .createdDate(revision.getCreatedDate())
                        .build())
                .collect(Collectors.toList());
    }

    // API to get today's due revisions
    @GetMapping("/for-date")
    public List<RevisionResponse> getRevisionsForDate(@RequestParam(required = false) String targetDate) {
        return revisionService.getRevisionsForDate(targetDate).stream()
                .map(revision -> RevisionResponse.builder()
                        .id(revision.getId())
                        .text(revision.getText())
                        .revisionAfter(revision.getRevisionAfter())
                        .createdDate(revision.getCreatedDate())
                        .build())
                .collect(Collectors.toList());
    }

    // API to get today's due revisions
    @PutMapping("/generate-revisions-for-month")
    public String generateRevisionsForMonth(@RequestParam() int year, @RequestParam() int month) {
        boolean generated = revisionService.generateRevisionsForMonth(year, month);

        if(generated){
            return "revision update started";
        }else {
            return "error occurred";
        }

    }
}
