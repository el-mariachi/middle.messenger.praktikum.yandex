import path from "path";
import express from "express";

export const app = express();

app.use('/', express.static(path.join(__dirname, '../../dist')));
