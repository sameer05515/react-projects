package com.prem.myresume.controller;

import com.prem.base.exception.CustomValidationException;
import com.prem.myresume.dto.MyResumeDto;
import com.prem.myresume.service.MyResumeService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/my-resume")
public class MyResumeController {

    private final MyResumeService myResumeService;

    @Autowired
    public MyResumeController(MyResumeService myResumeService) {
        this.myResumeService = myResumeService;
    }

    /**
     * Create or update multiple resumes
     */
    @PostMapping("/upsert")
    public ResponseEntity<List<MyResumeDto>> upsertMyResume(@RequestBody @NonNull List<MyResumeDto> myResumes) {
        List<MyResumeDto> savedResumes = myResumeService.upsertMyResumes(myResumes);
        return new ResponseEntity<>(savedResumes, HttpStatus.OK);
    }

    /**
     * Create a single resume
     */
    @PostMapping
    public ResponseEntity<MyResumeDto> createResume(@RequestBody @NonNull MyResumeDto myResume) {
        List<MyResumeDto> savedResumes = myResumeService.upsertMyResumes(List.of(myResume));
        return new ResponseEntity<>(savedResumes.get(0), HttpStatus.CREATED);
    }

    /**
     * Get resume by uniqueId (via header)
     */
    @GetMapping("/get")
    public ResponseEntity<MyResumeDto> getResumeByUniqueId(@RequestHeader("uniqueId") @NonNull String uniqueId) {
        try {
            MyResumeDto resume = myResumeService.getResumeByUniqueId(uniqueId);
            return new ResponseEntity<>(resume, HttpStatus.OK);
        } catch (CustomValidationException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Get resume by uniqueId (via path variable)
     */
    @GetMapping("/{uniqueId}")
    public ResponseEntity<MyResumeDto> getResumeByUniqueIdPath(@PathVariable @NonNull String uniqueId) {
        try {
            MyResumeDto resume = myResumeService.getResumeByUniqueId(uniqueId);
            return new ResponseEntity<>(resume, HttpStatus.OK);
        } catch (CustomValidationException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Get all resumes
     */
    @GetMapping
    public ResponseEntity<List<MyResumeDto>> getAllResumes() {
        List<MyResumeDto> resumes = myResumeService.getAllResumes();
        return new ResponseEntity<>(resumes, HttpStatus.OK);
    }

    /**
     * Update a resume by uniqueId
     */
    @PutMapping("/{uniqueId}")
    public ResponseEntity<MyResumeDto> updateResume(@PathVariable @NonNull String uniqueId, 
                                                     @RequestBody @NonNull MyResumeDto myResume) {
        myResume.setUniqueId(uniqueId);
        List<MyResumeDto> updatedResumes = myResumeService.upsertMyResumes(List.of(myResume));
        return new ResponseEntity<>(updatedResumes.get(0), HttpStatus.OK);
    }

    /**
     * Delete a resume by uniqueId (soft delete)
     */
    @DeleteMapping("/{uniqueId}")
    public ResponseEntity<String> deleteResume(@PathVariable @NonNull String uniqueId) {
        try {
            myResumeService.deleteResumeByUniqueId(uniqueId);
            return new ResponseEntity<>("Resume deleted successfully", HttpStatus.OK);
        } catch (CustomValidationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
