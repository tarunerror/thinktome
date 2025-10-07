# Nodemailer Setup Guide

This project uses Nodemailer for sending emails through a serverless API endpoint. This guide will help you set up the email service.

## Prerequisites

- A Gmail account (or any other SMTP provider)
- Environment variables configured

## Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification**

### Step 2: Create App-Specific Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** as the app
3. Select **Other** as the device and name it "ThinkTome"
4. Click **Generate**
5. Copy the 16-character password (remove spaces)

### Step 3: Configure Environment Variables

Add these to your `.env` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
SMTP_TO_EMAIL=its.tarun01@gmail.com
```

## Other SMTP Providers

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
SMTP_TO_EMAIL=recipient@example.com
```

### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_mailgun_username
SMTP_PASS=your_mailgun_password
SMTP_TO_EMAIL=recipient@example.com
```

### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
SMTP_TO_EMAIL=recipient@example.com
```

## Deployment

### Vercel

The API endpoint is configured to work with Vercel's serverless functions out of the box.

1. Deploy your project to Vercel
2. Add environment variables in Vercel dashboard:
   - Go to **Project Settings** → **Environment Variables**
   - Add all SMTP_* variables

### Netlify

For Netlify, you'll need to configure the API endpoint differently:

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Create `netlify.toml`:

```toml
[build]
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

3. Move the `api` folder to `netlify/functions`
4. Add environment variables in Netlify dashboard

## Testing

Test the email service locally:

```bash
npm run dev
```

Navigate to the contact form and send a test message.

## Troubleshooting

### "Invalid login" error

- Ensure 2FA is enabled on Gmail
- Double-check your app-specific password
- Make sure there are no spaces in the password

### "Connection timeout" error

- Check your SMTP_HOST and SMTP_PORT
- Verify your firewall isn't blocking SMTP connections
- Try using port 465 with SMTP_SECURE=true

### Emails not being received

- Check spam/junk folders
- Verify SMTP_TO_EMAIL is correct
- Check your email provider's sending limits

## Security Best Practices

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use app-specific passwords** - Don't use your main email password
3. **Rotate passwords regularly** - Change app passwords periodically
4. **Monitor usage** - Keep track of emails sent to prevent abuse
5. **Rate limiting** - Consider implementing rate limiting on the API endpoint

## Rate Limits

Different providers have different rate limits:

- **Gmail**: 500 emails/day (free), 2000/day (Google Workspace)
- **SendGrid**: 100 emails/day (free tier)
- **Mailgun**: 5000 emails/month (free tier)

Choose based on your expected volume.
