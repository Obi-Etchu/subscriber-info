import pool from "../config/db.js";

export const getSubscriber = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM people WHERE phone_number = ?",
      [phone]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
