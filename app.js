import express from 'express';
const app = express();
import {corsSchema} from './middlewares/cors.js';
import { router } from './routes/students.js';

app.disable('x-powered-by');
app.use(express.json());
app.use(corsSchema());
app.use(express.static('frontend-web'));
app.use('/students', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port http://localhost:'+PORT);
});