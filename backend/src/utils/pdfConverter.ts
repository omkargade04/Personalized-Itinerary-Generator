import puppeteer from 'puppeteer';
import { itineraryHtml } from '../templates/pdfTemplate';
import { Itinerary } from '../types';

const generatePdf = async (itinerary: Itinerary, username: string): Promise<Buffer> => {
    try {
        const html = itineraryHtml(username, itinerary);

        if (!html) {
            throw new Error('Error in generating HTML');
        }

        // const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({ 
            args: ['--disable-setuid-sandbox', '--no-sandbox', '--single-process', '--no-zygote'],
            executablePath: puppeteer.executablePath(),
        });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfBuffer = await page.pdf();
        await browser.close();
        return Buffer.from(pdfBuffer);
    } catch (err: any) {
        console.log(err)
        throw new Error(`Failed to generate PDF: ${err.message}`);
    }
}


export default generatePdf;