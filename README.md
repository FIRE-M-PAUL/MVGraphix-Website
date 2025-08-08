# MVGraphix Backend

A Node.js/Express backend for the MVGraphix website, providing contact form handling, email notifications, and API endpoints.

## Features

- ✅ Contact form processing with email notifications
- ✅ Email validation and spam protection
- ✅ Rate limiting for API endpoints
- ✅ Security headers with Helmet
- ✅ CORS support for cross-origin requests
- ✅ Portfolio and services data endpoints
- ✅ Health check endpoint
- ✅ Automatic confirmation emails to users

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account for sending emails

## Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Rename `config.env` to `.env`
   - Update the email configuration:
     ```
     EMAIL_USER=your-gmail@gmail.com
     EMAIL_PASS=your-gmail-app-password
     ```

## Gmail Setup for Email Sending

To send emails through Gmail, you need to:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in your `.env` file

## Running the Backend

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Contact Form
- **POST** `/api/contact`
- **Body:** `{ name, email, service, message }`
- **Response:** Success/error message

### Portfolio Data
- **GET** `/api/portfolio`
- **Response:** Array of portfolio items

### Services Data
- **GET** `/api/services`
- **Response:** Array of service offerings

### Health Check
- **GET** `/api/health`
- **Response:** Server status and version

## Frontend Integration

To use the backend with your existing frontend:

1. **Update the contact form in `MV.html`** to use the backend instead of EmailJS:

```javascript
// Replace the EmailJS code with this:
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    service,
                    message
                })
            });

            const result = await response.json();

            if (result.success) {
                alert('Thank you! Your message was sent successfully. We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Sorry, there was an error sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
```

## Security Features

- **Rate Limiting:** Prevents spam and abuse
- **Input Validation:** Validates email addresses and required fields
- **Security Headers:** Protects against common web vulnerabilities
- **CORS Configuration:** Controls cross-origin requests

## File Structure

```
MVGraphix/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── config.env         # Environment variables
├── README.md          # This file
├── MV.html            # Frontend website
├── style.css          # Frontend styles
├── index.js           # Frontend JavaScript
└── images/            # Image assets
```

## Troubleshooting

### Email Not Sending
1. Check your Gmail app password is correct
2. Ensure 2-factor authentication is enabled
3. Verify the email addresses in your `.env` file

### Port Already in Use
Change the PORT in your `.env` file or kill the process using the port.

### CORS Errors
The backend is configured to allow all origins in development. For production, update the CORS configuration in `server.js`.

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment variables
2. Use a process manager like PM2
3. Set up a reverse proxy (nginx/Apache)
4. Use HTTPS with SSL certificates
5. Update CORS settings for your domain

## Support

For issues or questions, please check the troubleshooting section or create an issue in the project repository.
