import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
import { User } from '../types';
import { emailTemplate } from '../templates/emailTemplate';

configDotenv();

async function emailService(user: User, pdf: Buffer, filePath: string) {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        });

        const mailOption = {
            from: `Personalized Travel Itinerary Service <no-reply-${process.env.MAIL_USERNAME}>`,
            to: user.email,
            subject: 'Your Personalized Travel Itinerary',
            html: emailTemplate(user),
            attachments: [
                {
                    filename: filePath,
                    content: pdf,
                    contentType: 'application/pdf',
                },
            ],
        };

        const info = await transporter.sendMail(mailOption);

    }catch(err: any) {
        console.log("Error: ", err);
    }
};

export { emailService };