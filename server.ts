import path from 'path';
import express from 'express';

const app = express();

const projectRoot = path.resolve('./');
app.use('/', express.static(path.join(projectRoot, 'dist')));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`);
});
