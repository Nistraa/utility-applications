import express from 'express';
import path from 'path';
import helmet from 'helmet';
import crypto from 'crypto';
import mergeRouter from './routes/mergeRouter';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    next();
});

app.use((req, res, next) => {
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", 'https://fonts.googleapis.com'],
                fontSrc: ["'self'", 'https://fonts.gstatic.com'],
                scriptSrc: ["'self'", `'nonce-${res.locals.nonce}'`],
            },
        },
    })(req, res, next);
});

app.use(express.static(path.join(__dirname,'..', 'public')));

app.use('/merge', mergeRouter)

app.get('/', (req, res) => {
    res.render('index', { nonce: res.locals.nonce });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});