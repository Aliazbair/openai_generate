import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import imgAi from './routers/imgAi.js';
dotenv.config();

const port = process.env.PORT || 4000;

// init app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// todo set static folder
app.use(express.static(path.join(process.cwd(), 'public')));
// create some route
app.use('/openai', imgAi);

// setup listing
app.listen(port, () => console.log(`Server start with port ${port}`));
