"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = emailService;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = require("dotenv");
const emailTemplate_1 = require("../templates/emailTemplate");
(0, dotenv_1.configDotenv)();
function emailService(user, pdf, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transporter = nodemailer_1.default.createTransport({
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
                html: (0, emailTemplate_1.emailTemplate)(user),
                attachments: [
                    {
                        filename: filePath,
                        content: pdf,
                        contentType: 'application/pdf',
                    },
                ],
            };
            const info = yield transporter.sendMail(mailOption);
        }
        catch (err) {
            console.log("Error: ", err);
        }
    });
}
;
