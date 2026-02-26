import * as postmark from 'postmark'
import { env } from './env'

export interface Attachment {
  name: string
  content: string
  contentType: string
}

export interface SendEmailInput {
  fromEmail: string
  fromName: string
  toEmail: string
  subject: string
  htmlContent: string
  attachments?: Attachment[]
}

export async function sendEmail(args: SendEmailInput): Promise<void> {
  const postmarkClient = new postmark.ServerClient(env.POSTMARK_API_KEY)
  const { fromEmail, toEmail, subject, htmlContent, attachments } = args

  await postmarkClient.sendEmail({
    From: fromEmail,
    To: toEmail,
    Subject: subject,
    HtmlBody: htmlContent,
    MessageStream: env.POSTMARK_MESSAGE_STREAM,
    Attachments: attachments?.map(
      ({ name, content, contentType }) => new postmark.Attachment(name, content, contentType),
    ),
  })
}
