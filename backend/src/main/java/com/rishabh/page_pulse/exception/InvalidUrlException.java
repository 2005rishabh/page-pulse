package com.rishabh.page_pulse.exception;

import com.rishabh.page_pulse.enums.ErrorType;

public class InvalidUrlException extends RuntimeException {

    private final ErrorType errorType;

    public InvalidUrlException(String message, ErrorType errorType) {
        super(message);
        this.errorType = errorType;
    }

    public InvalidUrlException(String message, ErrorType errorType, Throwable cause) {
        super(message, cause);
        this.errorType = errorType;
    }

    public ErrorType getErrorType() {
        return errorType;
    }
}
