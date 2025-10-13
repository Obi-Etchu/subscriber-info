import pool from "../config/db.js";

export const getSubscriber = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // PostgreSQL uses $1, $2, $3... for parameter placeholders
    const result = await pool.query(
      "SELECT * FROM people WHERE phone_number = $1",
      [phone]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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