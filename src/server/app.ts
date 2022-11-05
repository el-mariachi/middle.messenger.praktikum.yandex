import path from 'path';
import express from 'express';

export const app = express();

const projectRoot = path.resolve('./');
app.use('/', express.static(path.join(projectRoot, 'dist')));
app.use('/images', express.static(path.join(projectRoot, 'static/images')));
