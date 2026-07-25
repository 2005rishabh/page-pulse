package com.rishabh.page_pulse.service.impl;

import com.rishabh.page_pulse.constants.AppConstants;
import com.rishabh.page_pulse.dto.AnalyzeResponse;
import com.rishabh.page_pulse.enums.ErrorType;
import com.rishabh.page_pulse.exception.InvalidUrlException;
import com.rishabh.page_pulse.exception.NonHtmlContentException;
import com.rishabh.page_pulse.exception.WebsiteUnavailableException;
import com.rishabh.page_pulse.service.PageAnalyzerService;
import com.rishabh.page_pulse.util.HtmlParserUtil;
import com.rishabh.page_pulse.util.UrlValidatorUtil;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class PageAnalyzerServiceImpl implements PageAnalyzerService {

    private final HttpClient httpClient;

    public PageAnalyzerServiceImpl(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    @Override
    public AnalyzeResponse analyze(String url) {
        URI uri = UrlValidatorUtil.validateUrl(url);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri)
                .timeout(Duration.ofMillis(AppConstants.HTTP_TIMEOUT_MILLIS))
                .header("User-Agent", AppConstants.USER_AGENT)
                .GET()
                .build();

        HttpResponse<String> response;
        long startTime = System.nanoTime();
        try {
            response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new WebsiteUnavailableException("Unable to fetch website content", exception,
                    ErrorType.WEBSITE_UNAVAILABLE);
        }
        long elapsedMillis = (System.nanoTime() - startTime) / 1_000_000;

        int statusCode = response.statusCode();
        String contentType = response.headers().firstValue("Content-Type").orElse("");
        if (!HtmlParserUtil.isHtmlContentType(contentType)) {
            throw new NonHtmlContentException("Target URL did not return HTML content", ErrorType.NON_HTML);
        }

        Document document = HtmlParserUtil.parseHtml(response.body(), uri.toString());
        String pageTitle = HtmlParserUtil.extractTitle(document);
        String metaDescription = HtmlParserUtil.extractMetaDescription(document);
        int h1Count = HtmlParserUtil.countH1Tags(document);
        int imagesWithoutAlt = HtmlParserUtil.countImagesWithoutAlt(document);
        int wordCount = HtmlParserUtil.countVisibleWords(document);

        return new AnalyzeResponse(statusCode, elapsedMillis, pageTitle, metaDescription, h1Count, imagesWithoutAlt,
                wordCount);
    }
}
