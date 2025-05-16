import cors from 'cors';

const AVAILABLES = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:5500',
  '*'
]

export const corsSchema = ({acceptOrigins = AVAILABLES} = {}) => cors({
  origin: (origin, callback)=>{
    if(acceptOrigins.includes(origin)){
      return callback(null, true);
    }else if(!origin){
      return callback(null, true);  
    }

    return callback(new Error('Not allowed by CORS'));
  }
});