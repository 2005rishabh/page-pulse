package com.rishabh.page_pulse.controller;

import com.rishabh.page_pulse.dto.AnalyzeRequest;
import com.rishabh.page_pulse.dto.AnalyzeResponse;
import com.rishabh.page_pulse.service.PageAnalyzerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Validated
public class PageAnalyzerController {

    private final PageAnalyzerService pageAnalyzerService;

    public PageAnalyzerController(PageAnalyzerService pageAnalyzerService) {
        this.pageAnalyzerService = pageAnalyzerService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalyzeResponse> analyzePage(@Valid @RequestBody AnalyzeRequest request) {
        AnalyzeResponse analysis = pageAnalyzerService.analyze(request.getUrl());
        return ResponseEntity.ok(analysis);
    }
}
