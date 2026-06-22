# American Logo Expert

Next.js 16 website for americanlogoexpert.com.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add the real SMTP password before testing form delivery. `.env.local` is ignored by Git.

## Hostinger email setup

1. In Hostinger hPanel, open **Emails**, choose the domain, and create the `Info@americanlogoexpert.com` business mailbox. Set a strong mailbox password and keep it outside source control.
2. Open the mailbox configuration/connect-apps screen to confirm its SMTP settings. Standard Hostinger Email normally uses `smtp.hostinger.com`, port `465`, with SSL/TLS enabled.
3. Add the following environment variables in Hostinger’s application environment settings (and in `.env.local` for local testing):

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Info@americanlogoexpert.com
SMTP_PASS=the_real_mailbox_password
MAIL_FROM=Info@americanlogoexpert.com
MAIL_TO=Info@americanlogoexpert.com
```

The password is read only by the server-side route at `/api/contact`; it is never exposed through a `NEXT_PUBLIC_` variable or sent to the browser.

### Titan Email

If the Hostinger account uses Titan Email, change only the host unless the mailbox configuration screen specifies otherwise:

```env
SMTP_HOST=smtp.titan.email
```

Keep port `465` and `SMTP_SECURE=true` when using SSL/TLS.

## Testing form delivery

1. Add valid SMTP credentials and restart the Next.js server so environment changes are loaded.
2. Submit the Contact page form and the discount popup form with a real reply email.
3. Confirm the UI displays a success message and a new lead arrives at `Info@americanlogoexpert.com`.
4. Check spam/junk if the first message is delayed. If delivery fails, inspect the server log—not the browser console—for the Nodemailer error and verify the mailbox password, SMTP host, port, and SSL setting.
5. Run `npm run lint` and `npm run build` before deployment.

The endpoint includes server-side validation, HTML escaping, a honeypot field, request-size limits, and basic in-memory rate limiting. For multi-instance deployments, replace the in-memory limiter with a shared Redis-backed limiter.
