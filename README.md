# Page Pulse - Website Audit & Analysis Tool

Page Pulse is a lightweight, full-stack website auditing tool. Given any URL, it fetches the page content and returns audit metrics including response latency, HTTP status code, page title, meta description, heading structure (`<h1>` tag count), accessibility warnings (images missing `alt` text), and body word count.

---

## Technical Stack

- **Backend**: Java 21, Spring Boot 4.1.0, JSoup 1.16.2, Lombok
- **Frontend**: React 18, Vite 5, Tailwind CSS, Lucide React, Axios

---

## Local Setup Instructions

### Prerequisites
- **Java Development Kit (JDK 21)** or higher
- **Node.js (v18+)** and `npm`

### 1. Run the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The Spring Boot backend will start on `http://localhost:8080`.

To run backend unit tests:

```bash
cd backend
./mvnw test
```

### 2. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The React frontend will be available at `http://localhost:3000` (or `http://localhost:5173`).

---

## API Contract Specification

### Endpoint: Analyze Website URL

- **URL**: `/api/analyze`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

#### Request Body
```json
{
  "url": "https://example.com"
}
```

#### Success Response (`200 OK`)
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

#### Supported HTTP Status Codes
| HTTP Status | Trigger Condition |
| :--- | :--- |
| `200 OK` | Target website successfully fetched and parsed. |
| `400 Bad Request` | Provided URL is blank, malformed, or lacks standard scheme/host. |
| `415 Unsupported Media Type` | Target URL returned non-HTML content (e.g. JSON, PDF, image). |
| `502 Bad Gateway` | Target website is unreachable, host resolution failed, or connection timed out. |

---

## 3 Key Design Decisions & Reasoning

### 1. Native Java `HttpClient` over Third-Party Libraries
Instead of pulling in external dependencies like Apache HttpClient or Spring's WebClient, the application utilizes Java's built-in `java.net.http.HttpClient`. 
- **Reasoning**: It provides out-of-the-box support for HTTP/2 and HTTP/1.1, clean timeout configuration (`Duration.ofMillis(10000)`), native redirect handling, and avoids introducing unnecessary transitive dependencies to the classpath.

### 2. Defensive DOM Parsing & Fallback Extraction Strategy
Websites vary significantly in HTML structure. `HtmlParserUtil` uses JSoup to safely extract elements without throwing NullPointerExceptions.
- **Reasoning**: For the meta description, the parser checks standard `<meta name="description">` first, and if missing, falls back to OpenGraph `<meta property="og:description">`. Word counting operates on normalized body text (`document.body().text()`) to ignore script tags and CSS style blocks.

### 3. Granular Custom Exception Hierarchy with `@ControllerAdvice`
Rather than allowing unhandled runtime exceptions to bubble up into generic `500 Internal Server Error` responses, specific domain exceptions were created (`InvalidUrlException`, `NonHtmlContentException`, `WebsiteUnavailableException`).
- **Reasoning**: This provides clear, actionable feedback to the user interface. For instance, attempting to analyze a PDF returns a clear `415 Unsupported Media Type` message instead of crashing during HTML parsing.

---

## Live Build Notice

Built for Digital Heroes Training Task – [digitalheroesco.com](https://digitalheroesco.com)
