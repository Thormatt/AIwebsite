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
    const { name, company, email, subject, message } = req.body;

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
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>', // Change this after domain verification
        to: 'thormatt@gmail.com', // Your email
        subject: `[Website Contact] ${subject || 'General Inquiry'} from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        reply_to: email,
      });

      return res.status(200).json({ success: true, message: 'Email sent successfully' });
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