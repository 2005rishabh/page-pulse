package com.rishabh.page_pulse.service;

import com.rishabh.page_pulse.dto.AnalyzeResponse;

public interface PageAnalyzerService {

    AnalyzeResponse analyze(String url);
}
