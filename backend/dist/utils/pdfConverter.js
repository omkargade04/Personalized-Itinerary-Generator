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
const puppeteer_1 = __importDefault(require("puppeteer"));
const pdfTemplate_1 = require("../templates/pdfTemplate");
const generatePdf = (itinerary, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const html = (0, pdfTemplate_1.itineraryHtml)(username, itinerary);
        if (!html) {
            throw new Error('Error in generating HTML');
        }
        // const browser = await puppeteer.launch();
        const browser = yield puppeteer_1.default.launch({
            args: ['--disable-setuid-sandbox', '--no-sandbox', '--single-process', '--no-zygote'],
            executablePath: puppeteer_1.default.executablePath(),
        });
        const page = yield browser.newPage();
        yield page.setContent(html);
        const pdfBuffer = yield page.pdf();
        yield browser.close();
        return Buffer.from(pdfBuffer);
    }
    catch (err) {
        console.log(err);
        throw new Error(`Failed to generate PDF: ${err.message}`);
    }
});
exports.default = generatePdf;
