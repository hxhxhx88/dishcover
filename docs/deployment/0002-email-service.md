# Email

The project uses [Postmark](https://postmarkapp.com) for email delivery. Ensure you have an account set up before continuing. The following environment variables are required:

- `EMAIL_SENDER`: The address used to deliver emails.
- `POSTMARK_API_KEY`: The Postmark API key.
- `POSTMARK_MESSAGE_STREAM`: The Postmark stream used to deliver emails. You can use the default `outbound` stream initially.
