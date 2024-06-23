package com.prem.base.exception;

public class CustomValidationException extends RuntimeException {
    CustomErrorCode customErrorCode;
    public CustomValidationException(String message) {
        super(message);
    }

    public CustomValidationException(CustomErrorCode customErrorCode, Object... args) {
        super(String.format(customErrorCode.getErrorMessage(), args));
        this.customErrorCode = customErrorCode;
    }
}
