# Contact Form Setup Instructions

The contact form is currently set up with a frontend-only implementation. To make it functional, you need to connect it to a backend service.

## Option 1: Formspree (Recommended - Free tier available)

1. Sign up at https://formspree.io
2. Create a new form
3. Copy your form ID
4. In `script.js`, uncomment lines 173-179 and replace `YOUR_FORM_ID` with your actual form ID
5. Remove the simulation code on line 182

## Option 2: Netlify Forms (If deploying to Netlify)

1. Add `data-netlify="true"` to the form tag in `index.html`
2. Netlify will automatically handle form submissions

## Option 3: Vercel + SendGrid

1. Create an API route in `/api/contact.js`
2. Use SendGrid or another email service to send emails
3. Update the form action in `script.js` to point to your API endpoint

## Option 4: Custom Backend

Create your own endpoint that accepts POST requests with JSON data:
```json
{
  "name": "string",
  "company": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

## Current Implementation

The form currently simulates a successful submission for demonstration purposes. The actual email sending functionality needs to be configured based on your chosen option above.