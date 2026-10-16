// Email Controller
// Sends emails via AWS SES SigV4 REST API (Port 443)

import { Request, Response } from 'express'
import crypto from 'crypto'
import https from 'https'

const AWS_CONFIG = {
  region: process.env.AWS_REGION || 'ap-south-1',
  accessKey: process.env.AWS_ACCESS_KEY_ID || '',
  secretKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  senderEmail: process.env.SENDER_MAIL || 'hello@ascendqe.com',
  recipientEmail: process.env.RECIPIENT_MAIL || 'hello@zuvvix.com',
}

function hmac(key: Buffer | string, str: string): Buffer {
  return crypto.createHmac('sha256', key).update(str, 'utf8').digest()
}

function sha256(str: string): string {
  return crypto.createHash('sha256').update(str, 'utf8').digest('hex')
}

function sendAwsSesEmail(
  subject: string,
  htmlBody: string,
  textBody: string,
  replyToEmail?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  return new Promise((resolve) => {
    const host = `email.${AWS_CONFIG.region}.amazonaws.com`
    const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '')

    const params: Record<string, string> = {
      Action: 'SendEmail',
      Version: '2010-12-01',
      Source: AWS_CONFIG.senderEmail,
      'Destination.ToAddresses.member.1': AWS_CONFIG.recipientEmail,
      'Message.Subject.Data': subject,
      'Message.Subject.Charset': 'UTF-8',
      'Message.Body.Html.Data': htmlBody,
      'Message.Body.Html.Charset': 'UTF-8',
      'Message.Body.Text.Data': textBody,
      'Message.Body.Text.Charset': 'UTF-8',
    }

    if (replyToEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyToEmail)) {
      params['ReplyToAddresses.member.1'] = replyToEmail
    }

    const postBody = new URLSearchParams(params).toString()
    const canonicalUri = '/'
    const canonicalQueryString = ''
    const canonicalHeaders = `content-type:application/x-www-form-urlencoded; charset=utf-8\nhost:${host}\nx-amz-date:${amzDate}\n`
    const signedHeaders = 'content-type;host;x-amz-date'
    const payloadHash = sha256(postBody)
    const canonicalRequest = `POST\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`

    const credentialScope = `${dateStamp}/${AWS_CONFIG.region}/ses/aws4_request`
    const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${sha256(canonicalRequest)}`

    const kSecret = 'AWS4' + AWS_CONFIG.secretKey
    const kDate = hmac(kSecret, dateStamp)
    const kRegion = hmac(kDate, AWS_CONFIG.region)
    const kService = hmac(kRegion, 'ses')
    const kSigning = hmac(kService, 'aws4_request')
    const signature = crypto.createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex')

    const authHeader = `AWS4-HMAC-SHA256 Credential=${AWS_CONFIG.accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

    const req = https.request(
      `https://${host}/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Host: host,
          'X-Amz-Date': amzDate,
          Authorization: authHeader,
        },
      },
      (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            const match = data.match(/<MessageId>(.*?)<\/MessageId>/)
            resolve({ success: true, messageId: match ? match[1] : undefined })
          } else {
            const errMatch = data.match(/<Message>(.*?)<\/Message>/)
            const errorMsg = errMatch ? errMatch[1] : `AWS SES HTTP ${res.statusCode}: ${data}`
            resolve({ success: false, error: errorMsg })
          }
        })
      }
    )

    req.on('error', (err) => {
      resolve({ success: false, error: err.message })
    })

    req.write(postBody)
    req.end()
  })
}

export async function sendEmailController(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body || {}

    // Extract fields
    const name = (data.name || `${data.firstName || ''} ${data.lastName || ''}`).trim()
    const email = (data.email || data.workEmail || '').trim()
    const company = (data.company || '').trim()
    const role = (data.role || data.jobTitle || '').trim()
    const journey = (data.journey || '').trim()
    const systems = (data.systems || '').trim()
    const frequency = (data.frequency || '').trim()
    const difficulty = (data.difficulty || '').trim()
    const nextStep = (data.next || data.nextStep || '').trim()
    const phone = (data.phone || '').trim()
    const formType = (data.formType || '').trim()
    const interest = (data.interest || '').trim()
    const teamSize = (data.teamSize || '').trim()
    const product = (data.product || '').trim()
    const message = (data.message || data.comments || '').trim()

    const isDesignPartnership = formType === 'design-partnership' || !!journey

    if (isDesignPartnership) {
      if (!name || !email || !company || !role || !journey) {
        res.status(422).json({
          success: false,
          message: 'Please complete all five required fields (Name, Work email, Company, Role, and Critical journey).',
        })
        return
      }
    } else {
      if (!name || !email || !company) {
        res.status(422).json({
          success: false,
          message: 'Please complete all required fields.',
        })
        return
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(422).json({
        success: false,
        message: 'Please enter a valid work email address.',
      })
      return
    }

    let subject = ''
    let heading = ''
    if (isDesignPartnership) {
      subject = `New Design Partnership Conversation Request - ${name} (${company})`
      heading = 'New Design-Partnership Conversation Request'
    } else {
      subject = `New Conversation Request - ${name} (${company})`
      heading = 'New Conversation Request'
    }

    const htmlBody = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">
<h2 style="color: #2563eb; margin-top: 0;">${heading}</h2>
<p style="color: #64748b; font-size: 13px;">Submitted on zuvvix.com</p><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr><td style="padding: 6px 0; color: #64748b; width: 175px;"><strong>Name:</strong></td><td style="padding: 6px 0; color: #0f172a;">${name}</td></tr>
<tr><td style="padding: 6px 0; color: #64748b;"><strong>Work Email:</strong></td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
<tr><td style="padding: 6px 0; color: #64748b;"><strong>Company:</strong></td><td style="padding: 6px 0; color: #0f172a;">${company}</td></tr>
${role ? `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Role / Responsibility:</strong></td><td style="padding: 6px 0; color: #0f172a;">${role}</td></tr>` : ''}
${journey ? `<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Critical Journey:</strong></td><td style="padding: 6px 0; color: #0f172a;">${journey.replace(/\n/g, '<br/>')}</td></tr>` : ''}
${systems ? `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Interacting Systems:</strong></td><td style="padding: 6px 0; color: #0f172a;">${systems}</td></tr>` : ''}
${frequency ? `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Release Frequency:</strong></td><td style="padding: 6px 0; color: #0f172a;">${frequency}</td></tr>` : ''}
${difficulty ? `<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Quality Difficulty:</strong></td><td style="padding: 6px 0; color: #0f172a;">${difficulty.replace(/\n/g, '<br/>')}</td></tr>` : ''}
${nextStep ? `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Preferred Next Step:</strong></td><td style="padding: 6px 0; color: #0f172a;">${nextStep === 'conversation' ? 'Working conversation' : nextStep === 'context' ? 'Share more context first' : nextStep}</td></tr>` : ''}
${phone ? `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td><td style="padding: 6px 0; color: #0f172a;">${phone}</td></tr>` : ''}
${message ? `<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Message:</strong></td><td style="padding: 6px 0; color: #0f172a;">${message.replace(/\n/g, '<br/>')}</td></tr>` : ''}
</table></div></body></html>`

    const textBody = `${heading} on zuvvix.com\n\nName: ${name}\nWork Email: ${email}\nCompany: ${company}\n` +
      (role ? `Role: ${role}\n` : '') +
      (journey ? `Critical Journey: ${journey}\n` : '') +
      (systems ? `Systems: ${systems}\n` : '') +
      (frequency ? `Frequency: ${frequency}\n` : '') +
      (difficulty ? `Quality Difficulty: ${difficulty}\n` : '') +
      (nextStep ? `Next Step: ${nextStep}\n` : '') +
      (message ? `Message: ${message}\n` : '')

    const result = await sendAwsSesEmail(subject, htmlBody, textBody, email)

    if (!result.success) {
      console.error('[Email Controller] Delivery error:', result.error)
      res.status(500).json({
        success: false,
        message: `Email delivery failed: ${result.error}`,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Thank you! We will be in touch within 24 hours.',
      messageId: result.messageId,
    })
  } catch (err: any) {
    console.error('[Email Controller] Unexpected error:', err)
    res.status(500).json({
      success: false,
      message: err.message || 'Server error while sending email.',
    })
  }
}

