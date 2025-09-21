# Email Setup for Contact Form

The contact form is now connected to a Vercel serverless function. To receive emails, you need to set up an email service.

## Quick Setup with Resend (Recommended)

1. **Sign up for Resend** (free tier includes 100 emails/month)
   - Go to https://resend.com
   - Sign up for a free account

2. **Get your API Key**
   - In Resend dashboard, go to API Keys
   - Create a new API key
   - Copy the key

3. **Add to Vercel Environment Variables**
   - Go to your Vercel project dashboard
   - Go to Settings → Environment Variables
   - Add a new variable:
     - Name: `RESEND_API_KEY`
     - Value: Your Resend API key
     - Environment: Production, Preview, Development

4. **Verify your domain (optional but recommended)**
   - In Resend, add and verify your domain
   - This allows you to send from your own domain instead of onboarding@resend.dev

5. **Update the email address**
   - In `/api/contact.js`, line 35, change `thormatt@gmail.com` to your preferred email

## Alternative: Without Email Service

If you don't want to set up an email service immediately, the form will still work:
- Submissions will be logged in Vercel Functions logs
- Go to your Vercel dashboard → Functions → Logs to see submissions

## Testing Locally

To test the form locally:
```bash
npm install
vercel dev
```

Then open http://localhost:3000

## Current Implementation

The form currently:
1. Validates input on the frontend
2. Sends data to `/api/contact` endpoint
3. If RESEND_API_KEY is set, sends an email
4. Otherwise, logs the submission to Vercel logs
5. Returns success/error to the frontend

## Monitoring Submissions

Without email service, view submissions in:
- Vercel Dashboard → Functions → contact → Logs

With email service:
- Emails sent to your configured address
- Resend Dashboard shows email delivery status