package com.rishabh.page_pulse.exception;

import com.rishabh.page_pulse.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;

import java.time.Instant;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(InvalidUrlException.class)
    public ResponseEntity<ErrorResponse> handleInvalidUrl(InvalidUrlException ex, ServletWebRequest request) {
        log.error("Invalid URL: {}", ex.getMessage());
        return buildResponse(HttpStatus.BAD_REQUEST, "Invalid URL", ex.getMessage(),
                request.getRequest().getRequestURI());
    }

    @ExceptionHandler(NonHtmlContentException.class)
    public ResponseEntity<ErrorResponse> handleNonHtmlContent(NonHtmlContentException ex, ServletWebRequest request) {
        log.error("Non-HTML content error: {}", ex.getMessage());
        return buildResponse(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Unsupported Content Type", ex.getMessage(),
                request.getRequest().getRequestURI());
    }

    @ExceptionHandler(WebsiteUnavailableException.class)
    public ResponseEntity<ErrorResponse> handleWebsiteUnavailable(WebsiteUnavailableException ex,
            ServletWebRequest request) {
        log.error("Website unavailable: {}", ex.getMessage());
        return buildResponse(HttpStatus.BAD_GATEWAY, "Website Unavailable", ex.getMessage(),
                request.getRequest().getRequestURI());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex,
            ServletWebRequest request) {
        log.error("Validation failed for {}", request.getRequest().getRequestURI());
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return buildResponse(HttpStatus.BAD_REQUEST, "Validation Failed", message,
                request.getRequest().getRequestURI());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, ServletWebRequest request) {
        log.error("Unhandled exception for {}", request.getRequest().getRequestURI(), ex);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", ex.getMessage(),
                request.getRequest().getRequestURI());
    }

    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String error, String message, String path) {
        ErrorResponse errorResponse = new ErrorResponse(Instant.now(), status.value(), error, message, path);
        return ResponseEntity.status(status).body(errorResponse);
    }
}
