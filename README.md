# Page Pulse - Website Audit and Performance Analysis Tool

Page Pulse is a web application designed to audit any URL. The application analyzes key performance, SEO, accessibility, and content metrics, including HTTP status codes, network latency, document title, meta description, heading hierarchy, images missing alt attributes, and word count.

---

## Live Links

- Live Frontend Application: https://page-pulse-six-weld.vercel.app/
- Live Backend API Service: https://page-pulse-backend-yhsz.onrender.com

---

## Technical Stack

- Backend Framework: Java 21, Spring Boot 4.1.0, JSoup 1.16.2, Lombok
- Frontend Framework: React 18, Vite 5, Tailwind CSS, Lucide React, Axios
- Containerization: Docker (Multi-stage build)

---

## Local Setup and Installation

### Prerequisites

- Java Development Kit (JDK 21) or higher
- Node.js (v18 or higher) and npm

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Compile and start the Spring Boot server:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend server starts locally at `http://localhost:8080`.

3. Execute backend unit tests:
   ```bash
   ./mvnw test
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   The frontend application will be available at `http://localhost:3000`.

---

## API Contract Specification

### Endpoint: Analyze Website URL

- URL: `/api/analyze`
- Method: `POST`
- Headers: `Content-Type: application/json`

#### Request Payload

```json
{
  "url": "https://example.com"
}
```

#### Success Response (200 OK)

```json
{
  "httpStatus": 200,
  "responseTime": 245,
  "pageTitle": "Example Domain",
  "metaDescription": "Example Domain description text",
  "h1Count": 1,
  "imagesWithoutAlt": 0,
  "wordCount": 125
}
```

#### Error Response Payload Schema

```json
{
  "timestamp": "2026-07-25T17:30:00Z",
  "status": 400,
  "error": "Invalid URL",
  "message": "URL must use http or https scheme",
  "path": "/api/analyze"
}
```

#### HTTP Status Codes Summary

| HTTP Code | Condition |
| :--- | :--- |
| 200 OK | Target URL successfully fetched and parsed. |
| 400 Bad Request | URL parameter is blank, malformed, or missing scheme/host. |
| 415 Unsupported Media Type | Target URL returned non-HTML content type. |
| 502 Bad Gateway | Target website is unreachable or request timed out. |

---

## Technical Design Decisions and Rationale

### 1. Native Java HttpClient over External HTTP Client Libraries

Rather than importing third-party dependencies such as Apache HttpClient or OkHttp, the application uses Java 21's native `java.net.http.HttpClient`.

- Rationale: The native client provides built-in HTTP/2 support, asynchronous processing capability, explicit request timeout configuration (`Duration.ofMillis(10000)`), and native redirect handling while keeping the backend dependency footprint lightweight.

### 2. Defensive DOM Parsing Strategy with JSoup

Web documents often contain non-standard HTML or missing tags. The parsing engine in `HtmlParserUtil` implements fallback extraction rules.

- Rationale: For meta descriptions, the parser checks standard `<meta name="description">` first, falling back to OpenGraph `<meta property="og:description">` if necessary. Body text calculation isolates visible elements (`document.body().text()`) to ensure script elements, inline styles, and hidden tags do not distort the word count calculation.

### 3. Granular Domain Exception Hierarchy and Centralized Error Handling

Custom domain exceptions (`InvalidUrlException`, `NonHtmlContentException`, `WebsiteUnavailableException`) are raised directly during service execution and handled globally using Spring's `@ControllerAdvice`.

- Rationale: This approach prevents unhandled runtime exceptions from resulting in generic 500 errors. Instead, client applications receive explicit status codes (such as 400 Bad Request, 415 Unsupported Media Type, or 502 Bad Gateway) along with a structured JSON error response.

---

## Unit Testing Strategy

The repository includes unit test suites located in `backend/src/test/java/com/rishabh/page_pulse/util/`:

- `HtmlParserUtilTest`: Validates title extraction, meta description fallback parsing, `<h1>` tag counting, image `alt` text validation, body word counting, and Content-Type verification.
- `UrlValidatorUtilTest`: Validates scheme parsing, host verification, blank URL handling, and invalid protocol rejection.
- `WordCounterUtilTest`: Validates whitespace tokenization, multi-line string handling, and null safety.

---

## Live Build Verification

Built for Digital Heroes Training Task - [digitalheroesco.com](https://digitalheroesco.com)
