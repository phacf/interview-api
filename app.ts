import express from 'express';
import path from 'path';

import {router as quizz} from './src/routes/quizz';

const app = express();

app.use(express.json());

app.use('/quizz', quizz);

app.listen(3000, () => {
    console.log('running on: http://localhost:3000');
});