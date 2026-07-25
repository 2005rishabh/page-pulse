package com.rishabh.page_pulse.exception;

import com.rishabh.page_pulse.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;

import java.time.Instant;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidUrlException.class)
    public ResponseEntity<ErrorResponse> handleInvalidUrl(InvalidUrlException ex, ServletWebRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, "Invalid URL", ex.getMessage(),
                request.getRequest().getRequestURI());
    }

    @ExceptionHandler(NonHtmlContentException.class)
    public ResponseEntity<ErrorResponse> handleNonHtmlContent(NonHtmlContentException ex, ServletWebRequest request) {
        return buildResponse(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Unsupported Content Type", ex.getMessage(),
                request.getRequest().getRequestURI());
    }

    @ExceptionHandler(WebsiteUnavailableException.class)
    public ResponseEntity<ErrorResponse> handleWebsiteUnavailable(WebsiteUnavailableException ex,
            ServletWebRequest request) {
        return buildResponse(HttpStatus.BAD_GATEWAY, "Website Unavailable", ex.getMessage(),
                request.getRequest().getRequestURI());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex,
            ServletWebRequest request) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return buildResponse(HttpStatus.BAD_REQUEST, "Validation Failed", message,
                request.getRequest().getRequestURI());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, ServletWebRequest request) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", ex.getMessage(),
                request.getRequest().getRequestURI());
    }

    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String error, String message, String path) {
        ErrorResponse errorResponse = new ErrorResponse(Instant.now(), status.value(), error, message, path);
        return ResponseEntity.status(status).body(errorResponse);
    }
}
