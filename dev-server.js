import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
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
    secure: process.env.SMTP_SECURE === 'true',
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
      <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <!-- Background Pattern -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); min-height: 100vh;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="650" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; width: 100%;">
                <!-- Elegant Header with Logo -->
                <tr>
                  <td align="center" style="padding: 0 0 40px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 30px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 20px 20px 0 0; border: 1px solid rgba(148, 163, 184, 0.1); border-bottom: none;">
                          <!-- Logo -->
                          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px; filter: drop-shadow(0 10px 30px rgba(14, 165, 233, 0.4));">
                            <circle cx="50" cy="50" r="45" stroke="url(#grad1)" stroke-opacity="0.3" stroke-width="2" />
                            <path d="M30 50C30 40 40 35 50 35C60 35 70 40 70 50C70 60 60 65 50 65C40 65 30 60 30 50Z" stroke="url(#grad1)" stroke-opacity="0.4" stroke-width="2" />
                            <path d="M25 50C25 35 40 25 50 25C60 25 75 35 75 50C75 65 60 75 50 75C40 75 25 65 25 50Z" stroke="url(#grad2)" stroke-width="3.5" stroke-linecap="round" />
                            <path d="M40 45L60 45M40 55L60 55" stroke="url(#grad2)" stroke-width="3.5" stroke-linecap="round" />
                            <circle cx="35" cy="40" r="2.5" fill="#0EA5E9" />
                            <circle cx="65" cy="40" r="2.5" fill="#0EA5E9" />
                            <circle cx="35" cy="60" r="2.5" fill="#0EA5E9" />
                            <circle cx="65" cy="60" r="2.5" fill="#0EA5E9" />
                            <path d="M50 35L50 65" stroke="url(#grad2)" stroke-width="3.5" stroke-linecap="round" />
                            <defs>
                              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#0EA5E9;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
                              </linearGradient>
                              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#0EA5E9;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#6366f1;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <h1 style="color: #f8fafc; font-size: 32px; margin: 0; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">ThinkTome</h1>
                          <div style="width: 60px; height: 3px; background: linear-gradient(90deg, transparent, #0EA5E9, transparent); margin: 12px auto;"></div>
                          <p style="color: #94a3b8; font-size: 14px; margin: 8px 0 0 0; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;">AI-Powered Research Intelligence</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Main Content Card -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 0 0 20px 20px; border: 1px solid rgba(148, 163, 184, 0.1); border-top: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);">
                    
                    <!-- Prestigious Header Banner -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background: linear-gradient(135deg, #0EA5E9 0%, #6366f1 50%, #8b5cf6 100%); padding: 2px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="background: linear-gradient(135deg, #1e293b 0%, #312e81 100%); padding: 35px 40px; text-align: center;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td align="center">
                                      <div style="display: inline-block; background: rgba(14, 165, 233, 0.1); padding: 12px 24px; border-radius: 50px; border: 1px solid rgba(14, 165, 233, 0.3); margin-bottom: 15px;">
                                        <span style="color: #0EA5E9; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">Priority Communication</span>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center">
                                      <h2 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">📬 New Contact Inquiry</h2>
                                      <p style="color: #cbd5e1; margin: 12px 0 0 0; font-size: 15px; line-height: 1.6;">A prospective client has reached out through your contact form</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Professional Details Section -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding: 45px 40px;">
                          
                          <!-- Sender Information Card -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-radius: 16px; border: 2px solid rgba(14, 165, 233, 0.2); margin-bottom: 30px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);">
                            <tr>
                              <td style="padding: 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-bottom: 20px; border-bottom: 1px solid rgba(148, 163, 184, 0.1);">
                                      <p style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 8px 0; font-weight: 600;">Correspondent</p>
                                      <p style="color: #f1f5f9; margin: 0; font-size: 22px; font-weight: 700;">${from_name}</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(148, 163, 184, 0.1);">
                                      <p style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 8px 0; font-weight: 600;">Email Address</p>
                                      <p style="margin: 0;">
                                        <a href="mailto:${reply_to}" style="color: #0EA5E9; text-decoration: none; font-size: 16px; font-weight: 600; transition: color 0.3s;">${reply_to}</a>
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding-top: 20px;">
                                      <p style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 8px 0; font-weight: 600;">Subject Matter</p>
                                      <p style="color: #e2e8f0; margin: 0; font-size: 18px; font-weight: 600; line-height: 1.5;">${subject}</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <!-- Message Content -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 35px;">
                            <tr>
                              <td>
                                <p style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 15px 0; font-weight: 600;">Communication Content</p>
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-radius: 12px; border-left: 4px solid #0EA5E9; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);">
                                  <tr>
                                    <td style="padding: 28px;">
                                      <p style="color: #cbd5e1; margin: 0; font-size: 16px; line-height: 1.8; white-space: pre-wrap; font-weight: 400;">${message}</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <!-- Metadata Footer -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(14, 165, 233, 0.05); border-radius: 10px; border: 1px solid rgba(14, 165, 233, 0.1);">
                            <tr>
                              <td style="padding: 20px; text-align: center;">
                                <p style="color: #64748b; font-size: 12px; margin: 0 0 8px 0;">
                                  <strong style="color: #94a3b8;">Received:</strong> ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <p style="color: #64748b; font-size: 11px; margin: 0;">
                                  Automated notification from ThinkTome Contact Management System
                                </p>
                              </td>
                            </tr>
                          </table>

                          <!-- Action Button -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 40px;">
                            <tr>
                              <td align="center">
                                <table cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td align="center" style="background: linear-gradient(135deg, #0EA5E9 0%, #6366f1 50%, #8b5cf6 100%); border-radius: 12px; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4);">
                                      <a href="mailto:${reply_to}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 18px 45px; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; letter-spacing: 0.5px;">
                                        ✉️ Compose Professional Response
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>

                    <!-- Formal Footer -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 35px 40px; border-top: 2px solid rgba(14, 165, 233, 0.2); border-radius: 0 0 18px 18px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center">
                                <p style="color: #475569; font-size: 12px; margin: 0 0 12px 0; line-height: 1.6;">
                                  This is an automated notification from your ThinkTome contact management system.<br/>
                                  Please respond to inquiries within 24 hours to maintain professional standards.
                                </p>
                                <div style="width: 50px; height: 2px; background: linear-gradient(90deg, transparent, #334155, transparent); margin: 15px auto;"></div>
                                <p style="color: #334155; font-size: 11px; margin: 0;">
                                  © ${new Date().getFullYear()} ThinkTome Research Intelligence Platform. All Rights Reserved.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
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
      <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <!-- Background Pattern -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); min-height: 100vh;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="650" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; width: 100%;">
                
                <!-- Elegant Header with Logo -->
                <tr>
                  <td align="center" style="padding: 0 0 40px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 30px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 20px 20px 0 0; border: 1px solid rgba(148, 163, 184, 0.1); border-bottom: none;">
                          <!-- Logo -->
                          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px; filter: drop-shadow(0 10px 30px rgba(14, 165, 233, 0.4));">
                            <circle cx="50" cy="50" r="45" stroke="url(#grad1)" stroke-opacity="0.3" stroke-width="2" />
                            <path d="M30 50C30 40 40 35 50 35C60 35 70 40 70 50C70 60 60 65 50 65C40 65 30 60 30 50Z" stroke="url(#grad1)" stroke-opacity="0.4" stroke-width="2" />
                            <path d="M25 50C25 35 40 25 50 25C60 25 75 35 75 50C75 65 60 75 50 75C40 75 25 65 25 50Z" stroke="url(#grad2)" stroke-width="3.5" stroke-linecap="round" />
                            <path d="M40 45L60 45M40 55L60 55" stroke="url(#grad2)" stroke-width="3.5" stroke-linecap="round" />
                            <circle cx="35" cy="40" r="2.5" fill="#10b981" />
                            <circle cx="65" cy="40" r="2.5" fill="#10b981" />
                            <circle cx="35" cy="60" r="2.5" fill="#10b981" />
                            <circle cx="65" cy="60" r="2.5" fill="#10b981" />
                            <path d="M50 35L50 65" stroke="url(#grad3)" stroke-width="3.5" stroke-linecap="round" />
                            <defs>
                              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                              </linearGradient>
                              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                              </linearGradient>
                              <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <h1 style="color: #f8fafc; font-size: 32px; margin: 0; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">ThinkTome</h1>
                          <div style="width: 60px; height: 3px; background: linear-gradient(90deg, transparent, #10b981, transparent); margin: 12px auto;"></div>
                          <p style="color: #94a3b8; font-size: 14px; margin: 8px 0 0 0; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;">AI-Powered Research Intelligence</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Main Content Card -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 0 0 20px 20px; border: 1px solid rgba(148, 163, 184, 0.1); border-top: none; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);">
                    
                    <!-- Success Banner -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 2px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); padding: 45px 40px; text-align: center;">
                                <!-- Success Icon -->
                                <div style="width: 90px; height: 90px; background: rgba(255, 255, 255, 0.15); border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); border: 3px solid rgba(255, 255, 255, 0.2);">
                                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </div>
                                <h2 style="color: #ffffff; margin: 0; font-size: 30px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">Message Successfully Received</h2>
                                <div style="width: 80px; height: 3px; background: rgba(255, 255, 255, 0.4); margin: 18px auto;"></div>
                                <p style="color: rgba(255, 255, 255, 0.95); margin: 0; font-size: 16px; line-height: 1.7; max-width: 500px; margin: 0 auto;">Thank you for your inquiry, <strong style="font-weight: 700;">${from_name}</strong>. We have received your communication and will respond with the utmost attention to detail.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Professional Body -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding: 45px 40px;">
                          
                          <!-- Formal Greeting -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 35px;">
                            <tr>
                              <td>
                                <p style="color: #cbd5e1; font-size: 17px; line-height: 1.7; margin: 0 0 20px 0;">
                                  Dear <strong style="color: #f1f5f9; font-weight: 700;">${from_name}</strong>,
                                </p>
                                <p style="color: #94a3b8; font-size: 15px; line-height: 1.8; margin: 0;">
                                  We extend our sincere gratitude for your interest in ThinkTome. Your inquiry has been received and logged into our professional correspondence management system. Our dedicated team will review your message with careful consideration and provide a comprehensive response.
                                </p>
                              </td>
                            </tr>
                          </table>

                          <!-- Message Summary Card -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-radius: 16px; border: 2px solid rgba(16, 185, 129, 0.2); margin-bottom: 35px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);">
                            <tr>
                              <td style="padding: 32px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-bottom: 8px;">
                                      <p style="color: #10b981; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0; font-weight: 700;">Correspondence Summary</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(148, 163, 184, 0.1);">
                                      <p style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 8px 0; font-weight: 600;">Subject of Inquiry</p>
                                      <p style="color: #f1f5f9; margin: 0; font-size: 17px; font-weight: 600; line-height: 1.5;">${subject}</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding-top: 20px;">
                                      <p style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 12px 0; font-weight: 600;">Your Message</p>
                                      <div style="background: rgba(30, 41, 59, 0.6); border-radius: 10px; padding: 20px; border-left: 3px solid #10b981;">
                                        <p style="color: #cbd5e1; margin: 0; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <!-- Service Excellence Card -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%); border-radius: 14px; border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: 35px;">
                            <tr>
                              <td style="padding: 28px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td>
                                      <h3 style="color: #a7f3d0; font-size: 15px; margin: 0 0 18px 0; font-weight: 700; letter-spacing: 0.5px;">
                                        <span style="display: inline-block; width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; margin-right: 10px;"></span>
                                        What to Expect Next
                                      </h3>
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                          <td style="padding: 10px 0;">
                                            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7; margin: 0;">
                                              <strong style="color: #e2e8f0;">•</strong> Our professional team will conduct a thorough review of your inquiry
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style="padding: 10px 0;">
                                            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7; margin: 0;">
                                              <strong style="color: #e2e8f0;">•</strong> You will receive a detailed response within 24-48 business hours
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style="padding: 10px 0;">
                                            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7; margin: 0;">
                                              <strong style="color: #e2e8f0;">•</strong> Our correspondence will be directed to: <strong style="color: #f1f5f9;">${reply_to}</strong>
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style="padding: 10px 0;">
                                            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7; margin: 0;">
                                              <strong style="color: #e2e8f0;">•</strong> Please ensure the above email address is monitored regularly
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <!-- Invitation Section -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 35px;">
                            <tr>
                              <td>
                                <p style="color: #94a3b8; font-size: 15px; line-height: 1.8; margin: 0;">
                                  While awaiting our response, we cordially invite you to explore the <a href="https://thinktome.vercel.app" style="color: #0EA5E9; text-decoration: none; font-weight: 600; border-bottom: 1px solid rgba(14, 165, 233, 0.3);">ThinkTome Research Intelligence Platform</a>. Discover how our advanced AI technology transforms complex research into comprehensive, professionally-formatted academic papers.
                                </p>
                              </td>
                            </tr>
                          </table>

                          <!-- CTA Button -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center">
                                <table cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td align="center" style="background: linear-gradient(135deg, #0EA5E9 0%, #6366f1 50%, #8b5cf6 100%); border-radius: 12px; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4);">
                                      <a href="https://thinktome.vercel.app" style="display: inline-block; padding: 18px 50px; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; letter-spacing: 0.5px;">
                                        🔬 Explore ThinkTome Platform
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>

                    <!-- Professional Signature -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 35px 40px; border-top: 2px solid rgba(16, 185, 129, 0.2);">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <p style="color: #94a3b8; font-size: 15px; margin: 0 0 8px 0; font-weight: 600;">With Professional Regards,</p>
                                <p style="color: #cbd5e1; font-size: 16px; margin: 0; font-weight: 700;">The ThinkTome Research Team</p>
                                <p style="color: #64748b; font-size: 13px; margin: 8px 0 0 0; font-style: italic;">Advancing Knowledge Through Artificial Intelligence</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Footer -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 30px 40px; border-radius: 0 0 18px 18px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center">
                                <p style="color: #64748b; font-size: 13px; margin: 0 0 15px 0; line-height: 1.6;">
                                  For urgent matters, please respond directly to this email.<br/>
                                  Our support team monitors all correspondence channels continuously.
                                </p>
                                <table cellpadding="0" cellspacing="0" border="0" style="margin: 18px auto;">
                                  <tr>
                                    <td align="center">
                                      <a href="https://thinktome.vercel.app" style="color: #0EA5E9; text-decoration: none; font-size: 12px; margin: 0 12px; font-weight: 500;">Platform</a>
                                      <span style="color: #334155; margin: 0 5px;">•</span>
                                      <a href="https://thinktome.vercel.app/about" style="color: #0EA5E9; text-decoration: none; font-size: 12px; margin: 0 12px; font-weight: 500;">About Us</a>
                                      <span style="color: #334155; margin: 0 5px;">•</span>
                                      <a href="https://thinktome.vercel.app/privacy" style="color: #0EA5E9; text-decoration: none; font-size: 12px; margin: 0 12px; font-weight: 500;">Privacy Policy</a>
                                    </td>
                                  </tr>
                                </table>
                                <div style="width: 50px; height: 2px; background: linear-gradient(90deg, transparent, #334155, transparent); margin: 18px auto;"></div>
                                <p style="color: #334155; font-size: 11px; margin: 0;">
                                  © ${new Date().getFullYear()} ThinkTome Research Intelligence Platform.<br/>
                                  All Rights Reserved. Confidential & Proprietary.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
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
    
    // Provide more helpful error messages
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your SMTP credentials (username/password).';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Could not connect to email server. Please check your SMTP host and port.';
    }
    
    return res.status(500).json({ 
      error: errorMessage,
      details: error instanceof Error ? error.message : 'Unknown error',
      code: error.code || 'UNKNOWN'
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Dev API server running on http://localhost:${PORT}`);
  console.log(`📧 Email endpoint: http://localhost:${PORT}/api/send-email`);
});
