import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { from_name, reply_to, subject, message } = req.body;

  if (!from_name || !reply_to || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(reply_to)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Email to admin (you) - Notification of new message
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Message from ThinkTome</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <!-- Header with Logo -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
                <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 style="color: #f1f5f9; font-size: 28px; margin: 0; font-weight: 700;">ThinkTome</h1>
            <p style="color: #94a3b8; font-size: 14px; margin: 5px 0 0 0;">AI-Powered Research Assistant</p>
          </div>

          <!-- Main Content Card -->
          <div style="background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
            <!-- Card Header -->
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
              <h2 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">📬 New Contact Message</h2>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 14px;">You have received a new message from your contact form</p>
            </div>

            <!-- Card Body -->
            <div style="padding: 30px;">
              <!-- Sender Info -->
              <div style="background-color: #0f172a; border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #334155;">
                <div style="margin-bottom: 15px;">
                  <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">From</span>
                  <p style="color: #f1f5f9; margin: 5px 0 0 0; font-size: 18px; font-weight: 600;">${from_name}</p>
                </div>
                <div style="margin-bottom: 15px;">
                  <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                  <p style="margin: 5px 0 0 0;">
                    <a href="mailto:${reply_to}" style="color: #6366f1; text-decoration: none; font-size: 16px; font-weight: 500;">${reply_to}</a>
                  </p>
                </div>
                <div>
                  <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
                  <p style="color: #f1f5f9; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${subject}</p>
                </div>
              </div>

              <!-- Message Content -->
              <div style="background-color: #0f172a; border-radius: 12px; padding: 25px; border-left: 4px solid #6366f1;">
                <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;">Message</span>
                <p style="color: #e2e8f0; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${reply_to}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);">
                  Reply to ${from_name}
                </a>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding: 20px;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 10px 0;">
              This message was sent via ThinkTome contact form
            </p>
            <p style="color: #475569; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} ThinkTome. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email to sender - Confirmation
    const confirmationEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting ThinkTome</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <!-- Header with Logo -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
                <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 style="color: #f1f5f9; font-size: 28px; margin: 0; font-weight: 700;">ThinkTome</h1>
            <p style="color: #94a3b8; font-size: 14px; margin: 5px 0 0 0;">AI-Powered Research Assistant</p>
          </div>

          <!-- Main Content Card -->
          <div style="background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
            <!-- Success Icon Header -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center;">
              <div style="background-color: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 style="color: white; margin: 0; font-size: 26px; font-weight: 600;">Message Received!</h2>
              <p style="color: rgba(255, 255, 255, 0.95); margin: 12px 0 0 0; font-size: 15px; line-height: 1.5;">Thank you for reaching out to us, ${from_name}. We've received your message and will get back to you soon.</p>
            </div>

            <!-- Card Body -->
            <div style="padding: 35px 30px;">
              <!-- Greeting -->
              <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Hi <strong style="color: #f1f5f9;">${from_name}</strong>,
              </p>
              
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.7; margin: 0 0 25px 0;">
                We appreciate you taking the time to contact us. Your message is important to us, and we wanted to confirm that we've received it successfully.
              </p>

              <!-- Message Summary -->
              <div style="background-color: #0f172a; border-radius: 12px; padding: 25px; margin: 25px 0; border: 1px solid #334155;">
                <h3 style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0; font-weight: 600;">Your Message Summary</h3>
                <div style="margin-bottom: 12px;">
                  <span style="color: #64748b; font-size: 13px;">Subject:</span>
                  <p style="color: #f1f5f9; margin: 4px 0 0 0; font-size: 15px; font-weight: 500;">${subject}</p>
                </div>
                <div>
                  <span style="color: #64748b; font-size: 13px;">Message:</span>
                  <p style="color: #cbd5e1; margin: 8px 0 0 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; padding: 12px; background-color: #1e293b; border-radius: 8px; border-left: 3px solid #6366f1;">${message}</p>
                </div>
              </div>

              <!-- What's Next -->
              <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid rgba(99, 102, 241, 0.2);">
                <h3 style="color: #a5b4fc; font-size: 14px; margin: 0 0 12px 0; font-weight: 600; display: flex; align-items: center;">
                  <span style="display: inline-block; width: 6px; height: 6px; background-color: #6366f1; border-radius: 50%; margin-right: 8px;"></span>
                  What happens next?
                </h3>
                <ul style="color: #cbd5e1; font-size: 14px; line-height: 1.7; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">Our team will review your message carefully</li>
                  <li style="margin-bottom: 8px;">We typically respond within 24-48 hours</li>
                  <li>You'll receive our response at <strong style="color: #f1f5f9;">${reply_to}</strong></li>
                </ul>
              </div>

              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.7; margin: 25px 0 0 0;">
                In the meantime, feel free to explore <a href="https://thinktome.vercel.app" style="color: #6366f1; text-decoration: none; font-weight: 500;">ThinkTome</a> and discover how our AI-powered research assistant can help you generate comprehensive research papers on any topic.
              </p>

              <!-- CTA Button -->
              <div style="text-align: center; margin-top: 35px;">
                <a href="https://thinktome.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);">
                  Explore ThinkTome
                </a>
              </div>
            </div>

            <!-- Footer inside card -->
            <div style="background-color: #0f172a; padding: 25px 30px; border-top: 1px solid #334155;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Best regards,</p>
              <p style="color: #cbd5e1; font-size: 14px; margin: 0; font-weight: 600;">The ThinkTome Team</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding: 20px;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 15px 0;">
              Need immediate assistance? Reply to this email anytime.
            </p>
            <div style="margin: 15px 0;">
              <a href="https://thinktome.vercel.app" style="color: #6366f1; text-decoration: none; font-size: 13px; margin: 0 10px;">Website</a>
              <span style="color: #475569;">•</span>
              <a href="https://thinktome.vercel.app/about" style="color: #6366f1; text-decoration: none; font-size: 13px; margin: 0 10px;">About</a>
              <span style="color: #475569;">•</span>
              <a href="https://thinktome.vercel.app/privacy" style="color: #6366f1; text-decoration: none; font-size: 13px; margin: 0 10px;">Privacy</a>
            </div>
            <p style="color: #475569; font-size: 12px; margin: 15px 0 0 0;">
              © ${new Date().getFullYear()} ThinkTome. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to admin (you)
    await transporter.sendMail({
      from: `"ThinkTome Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO_EMAIL || 'its.tarun01@gmail.com',
      replyTo: reply_to,
      subject: `[ThinkTome] New message from ${from_name}: ${subject}`,
      text: `New contact form submission from ${from_name} (${reply_to})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: adminEmailHTML,
    });

    // Send confirmation email to sender
    await transporter.sendMail({
      from: `"ThinkTome" <${process.env.SMTP_USER}>`,
      to: reply_to,
      subject: `Thank you for contacting ThinkTome - We received your message!`,
      text: `Hi ${from_name},\n\nThank you for reaching out to us! We've received your message about "${subject}" and will get back to you within 24-48 hours.\n\nYour message:\n${message}\n\nBest regards,\nThe ThinkTome Team`,
      html: confirmationEmailHTML,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
