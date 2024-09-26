"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const emailTemplate = (user) => `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: auto;">
    <div style="background-color: #429FC9; padding: 10px; text-align: center; border-radius: 5px;">
        <h1 style="color: #fff; margin: 0;">Your Personalized Travel Itinerary is Ready!</h1>
    </div>
    
    <div style="padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <p>Dear <strong>${user.name}</strong>,</p>
        
        <p>We're thrilled to present your personalized travel itinerary, crafted based on your preferences and travel interests! Below, you'll find all the details you need to enjoy a memorable trip.</p>

        <p>The attached PDF contains a detailed, day-by-day itinerary including maps, hotel desription, suggested landmarks, must-visit places, and other useful information. We've tailored everything to ensure your trip is as enjoyable as possible.</p>

        <h2 style="color: #429FC9; text-align: center; margin: 20px 0;">Safe Travels!</h2>

        <p>Here are a few quick tips for your journey:</p>
        <ul style="margin-left: 20px;">
            <li>Ensure all travel documents and gear are packed.</li>
            <li>Be mindful and respectful of local traditions and cultures.</li>
        </ul>

        <p>If you have any questions or need assistance, don't hesitate to <a href="mailto:g.omkar1110@gmail.com" style="color: #429FC9;">reach out</a>.</p>

        <p>Thank you for choosing us to plan your travel adventure. We hope you have a wonderful time!</p>

        <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
            &copy; ${new Date().getFullYear()} Omkar Gade. All rights reserved.<br/>
        </p>
    </div>
</div>

`;
exports.emailTemplate = emailTemplate;
