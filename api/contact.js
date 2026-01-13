// Simple in-memory rate limiter (resets on function cold start)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 3; // 3 requests per minute per IP

// HTML sanitization to prevent XSS
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  // Restrict CORS to production domain
  const allowedOrigin = process.env.NODE_ENV === 'production'
    ? 'https://aiwiththor.com'
    : 'http://localhost:3000';

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Vary', 'Origin');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  if (rateLimitMap.has(clientIp)) {
    const requests = rateLimitMap.get(clientIp).filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

    if (requests.length >= MAX_REQUESTS) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    requests.push(now);
    rateLimitMap.set(clientIp, requests);
  } else {
    rateLimitMap.set(clientIp, [now]);
  }

  try {
    const { name, company, email, subject, message } = req.body;

    // Sanitize all inputs to prevent XSS
    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Option 1: Use Resend (recommended for Vercel)
    // To use this, sign up at https://resend.com and get an API key
    // Then add RESEND_API_KEY to your Vercel environment variables

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const result = await resend.emails.send({
          from: 'AI Executive Coaching <onboarding@resend.dev>', // More professional sender name
          to: 'thormatt@gmail.com', // Your email
          subject: `New inquiry from ${safeName} - ${safeCompany || 'Executive Coaching'}`,
          text: `Name: ${safeName}\nCompany: ${safeCompany || 'Not provided'}\nEmail: ${safeEmail}\nSubject: ${safeSubject || 'General Inquiry'}\n\nMessage:\n${safeMessage}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
                  <td style="padding: 8px 0;">${safeCompany || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Subject:</strong></td>
                  <td style="padding: 8px 0;">${safeSubject || 'General Inquiry'}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #333;"><strong>Message:</strong></p>
                <p style="color: #555; line-height: 1.6;">${safeMessage.replace(/\n/g, '<br>')}</p>
              </div>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
                <p>This email was sent from your website contact form at aiwiththor.com</p>
                <p>Reply directly to this email to respond to ${safeName}</p>
              </div>
            </div>
          `,
          reply_to: email,
        });

        console.log('Email sent successfully:', result);
        console.log('Sent to:', 'thormatt@gmail.com');
        console.log('Email ID:', result.id);
        return res.status(200).json({
          success: true,
          message: 'Email sent successfully'
        });
      } catch (error) {
        console.error('Resend error:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        return res.status(500).json({
          error: 'Failed to send email. Please try again or contact via LinkedIn.'
        });
      }
    }

    // Option 2: Store in a database or Google Sheets
    // For now, we'll just log it (you can see these in Vercel Functions logs)
    console.log('Contact Form Submission:', {
      name,
      company,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // In production without email service, you might want to:
    // 1. Store in a database (Vercel KV, Planetscale, etc.)
    // 2. Send to a Google Sheet using Google Sheets API
    // 3. Forward to a webhook (Zapier, Make, etc.)

    return res.status(200).json({
      success: true,
      message: 'Message received. Check Vercel logs for the submission.'
    });

  } catch (error) {
    console.error('Contact form error:', {
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({
      error: 'Failed to process submission. Please try again later.'
    });
  }
}