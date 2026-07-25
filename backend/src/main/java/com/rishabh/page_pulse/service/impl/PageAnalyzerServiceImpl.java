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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class PageAnalyzerServiceImpl implements PageAnalyzerService {

    private static final Logger log = LoggerFactory.getLogger(PageAnalyzerServiceImpl.class);

    private final HttpClient httpClient;

    public PageAnalyzerServiceImpl(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    @Override
    public AnalyzeResponse analyze(String url) {
        log.info("Analyzing {}", url);

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
            log.error("Timeout while fetching {}", uri, exception);
            throw new WebsiteUnavailableException("Unable to fetch website content", exception,
                    ErrorType.WEBSITE_UNAVAILABLE);
        }
        long elapsedMillis = (System.nanoTime() - startTime) / 1_000_000;

        int statusCode = response.statusCode();
        String contentType = response.headers().firstValue("Content-Type").orElse("");
        log.info("Response time: {} ms for {}", elapsedMillis, uri);
        log.info("HTTP status: {} for {}", statusCode, uri);

        if (!HtmlParserUtil.isHtmlContentType(contentType)) {
            log.error("Non-HTML content received for {}", uri);
            throw new NonHtmlContentException("Target URL did not return HTML content", ErrorType.NON_HTML);
        }

        Document document = HtmlParserUtil.parseHtml(response.body(), uri.toString());
        String pageTitle = HtmlParserUtil.extractTitle(document);
        String metaDescription = HtmlParserUtil.extractMetaDescription(document);
        int h1Count = HtmlParserUtil.countH1Tags(document);
        int imagesWithoutAlt = HtmlParserUtil.countImagesWithoutAlt(document);
        int wordCount = HtmlParserUtil.countVisibleWords(document);

        log.info("Page title: {}", pageTitle);
        log.info("Images without alt: {}", imagesWithoutAlt);
        log.info("Word count: {}", wordCount);

        return new AnalyzeResponse(statusCode, elapsedMillis, pageTitle, metaDescription, h1Count, imagesWithoutAlt,
                wordCount);
    }
}
