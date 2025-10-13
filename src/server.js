import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import subscriberRoutes from "./routes/subscriberRoutes.js";

dotenv.config();
const app = express()
const PORT = process.env.PORT || 3002;

app.use(express.json()); 
app.use(cors());

//Routes
app.use("/api/subscriber", subscriberRoutes);

app.get('/debug-db', async (req, res) => {
  try {
    console.log('Environment:', {
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      DB_HOST: process.env.DB_HOST,
      NODE_ENV: process.env.NODE_ENV
    });
    
    const result = await pool.query('SELECT NOW() as time');
    res.json({ 
      status: 'Database connected!',
      time: result.rows[0].time 
    });
  } catch (error) {
    res.json({ 
      status: 'Database connection failed',
      error: error.message 
    });
  }
});

app.get('/', (req, res) => {
    res.status(200).send('This is Obi testing');
  });

// mongoose.connect(MONGODBURL)
// .then(()=>{
//   console.log("Connected to database")
//   app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT} \n access it at http://localhost:${PORT}`)
// })
// })

// .catch(()=>{
//   console.log("Failed to connect to the database")
// })

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT} \n access it at http://localhost:${PORT}`)
})


