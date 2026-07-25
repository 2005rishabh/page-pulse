package com.rishabh.page_pulse.dto;

import jakarta.validation.constraints.NotBlank;

public class AnalyzeRequest {

    @NotBlank(message = "URL must not be blank")
    private String url;

    public AnalyzeRequest() {
    }

    public AnalyzeRequest(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
