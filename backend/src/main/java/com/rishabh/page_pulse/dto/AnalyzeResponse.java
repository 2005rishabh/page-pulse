package com.rishabh.page_pulse.dto;

public class AnalyzeResponse {

    private int httpStatus;
    private long responseTime;
    private String pageTitle;
    private String metaDescription;
    private int h1Count;
    private int imagesWithoutAlt;
    private int wordCount;

    public AnalyzeResponse() {
    }

    public AnalyzeResponse(int httpStatus, long responseTime, String pageTitle, String metaDescription,
            int h1Count, int imagesWithoutAlt, int wordCount) {
        this.httpStatus = httpStatus;
        this.responseTime = responseTime;
        this.pageTitle = pageTitle;
        this.metaDescription = metaDescription;
        this.h1Count = h1Count;
        this.imagesWithoutAlt = imagesWithoutAlt;
        this.wordCount = wordCount;
    }

    public int getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(int httpStatus) {
        this.httpStatus = httpStatus;
    }

    public long getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(long responseTime) {
        this.responseTime = responseTime;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public int getH1Count() {
        return h1Count;
    }

    public void setH1Count(int h1Count) {
        this.h1Count = h1Count;
    }

    public int getImagesWithoutAlt() {
        return imagesWithoutAlt;
    }

    public void setImagesWithoutAlt(int imagesWithoutAlt) {
        this.imagesWithoutAlt = imagesWithoutAlt;
    }

    public int getWordCount() {
        return wordCount;
    }

    public void setWordCount(int wordCount) {
        this.wordCount = wordCount;
    }
}
