# API Documentation

## Send Email Endpoint

**Endpoint:** `POST /api/send-email`

Sends an email using Nodemailer via serverless function.

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "from_name": "John Doe",
  "reply_to": "john@example.com",
  "subject": "Question about ThinkTome",
  "message": "I have a question about the research paper generator..."
}
```

### Response

**Success (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Validation Error (400):**
```json
{
  "error": "Missing required fields"
}
```

or

```json
{
  "error": "Invalid email address"
}
```

**Server Error (500):**
```json
{
  "error": "Failed to send email",
  "details": "Error message details"
}
```

### CORS

The endpoint supports CORS and accepts requests from any origin. In production, you should restrict this to your frontend domain.

### Environment Variables

Required environment variables for the email service:

- `SMTP_HOST` - SMTP server hostname (e.g., smtp.gmail.com)
- `SMTP_PORT` - SMTP server port (e.g., 587)
- `SMTP_SECURE` - Use TLS (true/false)
- `SMTP_USER` - SMTP username/email
- `SMTP_PASS` - SMTP password/app-specific password
- `SMTP_TO_EMAIL` - Recipient email address (optional, defaults to its.tarun01@gmail.com)

### Rate Limiting

Consider implementing rate limiting to prevent abuse. You can use services like:
- Vercel Edge Config
- Upstash Redis
- Custom middleware with IP tracking

### Security Considerations

1. **Input Validation:** The endpoint validates email format and required fields
2. **Environment Variables:** Sensitive credentials are stored in environment variables
3. **CORS:** Configure CORS to only allow requests from your frontend domain
4. **Rate Limiting:** Implement rate limiting in production
5. **Content Security:** Consider adding spam detection or captcha verification
