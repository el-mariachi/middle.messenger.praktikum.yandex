import { app } from './src/server/app';
const port = process.env.PORT || 3000;

// start server
app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`);
});
