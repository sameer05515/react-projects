package com.prem.base.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CustomErrorCode {
  RESUME_EXISTS(
    2001001,
    "Resume exists with unique id '%s'",
    HttpStatus.BAD_REQUEST
  ),
  RESUME_NOT_FOUND(
          2001002,
          "Resume not found with unique id '%s'",
          HttpStatus.BAD_REQUEST
  );

  private int businessErrorCode;
  private String errorMessage;
  private HttpStatus httpStatus;

  CustomErrorCode(
    int businessErrorCode,
    String errorMessage,
    HttpStatus httpStatus
  ) {
    this.businessErrorCode = businessErrorCode;
    this.errorMessage = errorMessage;
    this.httpStatus = httpStatus;
  }

//  static {
//    try{
//      checkForDuplicates();
//    }catch (Exception e){
//      e.printStackTrace();
//      System.exit(1);
//    }
//  }
//
//  private static void checkForDuplicates() throws Exception {
//    CustomErrorCode[] values = CustomErrorCode.values();
//
//    for (int i = 0; i < values.length; i++) {
//      for (int j = i + 1; j < values.length; j++) {
//        if (values[i].businessErrorCode == values[j].businessErrorCode) {
//          throw new Exception("Duplicate business error code: " + values[i].businessErrorCode);
//        }
//      }
//    }
//  }
}
