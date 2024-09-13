package com.prem.myresume.controller;

import com.prem.myresume.dto.MyResumeDto;
import com.prem.myresume.service.MyResumeService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/my-resume")
public class MyResumeController {

    private final MyResumeService myResumeService;

    @Autowired
    public MyResumeController(MyResumeService myResumeService) {
        this.myResumeService = myResumeService;
    }

    @PostMapping("/upsert")
    public ResponseEntity<List<MyResumeDto>> upsertMyResume(@RequestBody @NonNull List<MyResumeDto> myResumes) {
        List<MyResumeDto> savedResumes = myResumeService.upsertMyResumes(myResumes);
        return new ResponseEntity<>(savedResumes, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<MyResumeDto> getResumeByUniqueId(@RequestHeader("uniqueId") @NonNull String uniqueId) {
//        try {
//            MyResumeDto resume = myResumeService.getResumeByUniqueId(uniqueId);
        MyResumeDto resume = MyResumeDto.builder().uniqueId(uniqueId).build();
        return new ResponseEntity<>(resume, HttpStatus.OK);
//        } catch (CustomValidationException e) {
//            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
//        }
    }
}
