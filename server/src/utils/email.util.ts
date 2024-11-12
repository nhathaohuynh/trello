/* eslint-disable @typescript-eslint/no-explicit-any */

import nodemailer from 'nodemailer'
import env from '~/config/env.config'
import { EmailOptions } from './type.util'

export const replacePlaceholder = (template: string, params: any) => {
  Object.keys(params).forEach((key) => {
    const placeholder = `{{${key}}}`
    template = template.replace(new RegExp(placeholder, 'g'), params[key])
  })

  return template
}

export const sendMail = (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    service: env.SMTP_SERVICE,
    auth: {
      user: env.SMTP_MAIL,
      pass: env.SMTP_PASSWORD
    }
  })

  const mailOptions = {
    from: env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html: options.html
  }

  transporter.sendMail(mailOptions)
}
