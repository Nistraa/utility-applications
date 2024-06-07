import { Router } from 'express';
import { mergePdfFiles } from '../services/mergeServices';
import multer from 'multer';

const router = Router();

const upload = multer ({ dest: 'src/uploads/'});

router.post('/', upload.array('pdfs'), async (req, res) => {
    const fileName = req.query.fileName as string;
    console.log('Request received for merging PDFs');
    console.log(`Query parameter fileName: ${fileName}`);
    
    if (!fileName) {
        return res.status(400).send('Output file name is required!');
    }

    try {
        const files = req.files as Express.Multer.File[];
        const outputPath = await mergePdfFiles(files, `${fileName}.pdf`);
        res.download(outputPath);
    } catch (error) {
        console.error('Error merging PDFs:', error);
        res.status(500).send('Error merging PDFs!');
    }
});

export default router;