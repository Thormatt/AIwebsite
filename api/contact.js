export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, company, email, type, message } = req.body;

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
          subject: `New inquiry from ${name} - ${company || 'Executive Coaching'}`,
          text: `Name: ${name}\nCompany: ${company || 'Not provided'}\nEmail: ${email}\nType: ${type || 'General Inquiry'}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
                  <td style="padding: 8px 0;">${company || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Type:</strong></td>
                  <td style="padding: 8px 0;">${type || 'General Inquiry'}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #333;"><strong>Message:</strong></p>
                <p style="color: #555; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
                <p>This email was sent from your website contact form at ai-executive-coaching.vercel.app</p>
                <p>Reply directly to this email to respond to ${name}</p>
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
          message: 'Email sent successfully',
          id: result.id,
          to: 'thormatt@gmail.com',
          debug: `Check spam folder. Email ID: ${result.id}`
        });
      } catch (error) {
        console.error('Resend error:', error);
        return res.status(500).json({
          error: 'Failed to send email',
          details: error.message,
          hint: 'Check that RESEND_API_KEY is set correctly in Vercel environment variables'
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
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Failed to process submission',
      details: error.message
    });
  }
}