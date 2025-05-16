import cors from 'cors';

const AVAILABLES = [
  'https://students-crud-gomb.onrender.com', 
  'http://localhost:3000',             // para desarrollo local
  'http://127.0.0.1:5500',
  'http://localhost:3001'
];

export const corsSchema = ({acceptOrigins = AVAILABLES} = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || acceptOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
});