import express from 'express';
import path from 'path';
import mergeRouter from './routes/mergeRouter';

const app = express();
const port = 3000;

app.use('/merge', mergeRouter)

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});