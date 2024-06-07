import { PDFDocument } from "pdf-lib";
import fs from 'fs';
import path from 'path';

export const mergePdfFiles = async (files: Express.Multer.File[], fileName: string) => {
    try {
        const uploadsDir = path.join(__dirname, 'uploads');

        const pdfDocument = await PDFDocument.create();

        for (const file of files) {
            const pdfBytes = fs.readFileSync(file.path);
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await pdfDocument.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => {
                pdfDocument.addPage(page);
            });
        }

        const mergePdfBytes = await pdfDocument.save();
        const outputPath = path.join(uploadsDir, fileName);
        fs.writeFileSync(outputPath, mergePdfBytes);
        
        return outputPath;
    } catch (error) {
        throw new Error(`Failed to merge PDF files: ${error}`);
    }
};