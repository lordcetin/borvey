/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

const smtpTransport = nodemailer.createTransport({
  host: 'smtppro.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const email:any = formData.get('email')
    const fullName:any = formData.get('fullName')
    const code:any = formData.get('code')
    const type:any = formData.get('type')
    const route:any = formData.get('route')

    if (!email || !type) {
      return NextResponse.json({ error: 'Email and type are required' }, { status: 400 });
    }

    const templateData: any = {
      newUser: {
        path: './email/new-user.html',
        subject: "borvey'e Hoş Geldiniz!",
      },
      passwordReset: {
        path: './email/password-reset.html',
        subject: 'Şifre Yenileme Bağlantısı',
      },
      newOffer: {
        path: './email/update.html',
        subject: 'Yeni bir teklifiniz var!',
        message: 'Yeni bir teklifiniz var!',
      },
      newMessage: {
        path: './email/update.html',
        subject: 'Yeni bir mesajınız var!',
        message: 'Yeni bir mesajınız var!',
      },
      offerStatus: {
        path: './email/update.html',
        subject: 'Teklifinize cevap geldi!',
        message: 'Teklifinize cevap geldi!',
      },
    };

    if (!templateData[type]) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const templatePath = path.join(process.cwd(), templateData[type].path);
    let htmlContent = await fs.readFile(templatePath, 'utf8');
    
    if (type === 'newUser' || type === 'passwordReset') {
      if (!code) {
        return NextResponse.json({ error: 'Code is required for this type' }, { status: 400 });
      }
      let year:any = new Date()?.getFullYear()
      htmlContent = htmlContent
        .replace('///CODE///', code)
        .replace('///LINK///', code)
        .replace('///YEAR///', year)
        .replace('///fullName///', fullName);
    } else {
      if (!route) {
        return NextResponse.json({ error: 'Route is required for this type' }, { status: 400 });
      }
      htmlContent = htmlContent
        .replace('&&&route&&&', route)
        .replace('&&&message&&&', templateData[type].message || '');
    }

    const mailOptions = {
      from: `borvey <${process.env.EMAIL}>`,
      to: email,
      subject: templateData[type].subject,
      html: htmlContent,
    };

    const sendResult = await smtpTransport.sendMail(mailOptions);
    return NextResponse.json({ success: true, result: sendResult }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}