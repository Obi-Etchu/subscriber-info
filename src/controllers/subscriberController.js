import pool from "../config/db.js";

export const getSubscriber = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Detect if query is a phone number (digits only)
    const isPhone = /^\d+$/.test(query);

    let result;

    if (isPhone) {
      // Exact match by phone
      result = await pool.query(
        "SELECT * FROM people WHERE phone_number = $1",
        [query]
      );
    } else {
      // Partial name match (case-insensitive)
      result = await pool.query(
        "SELECT * FROM people WHERE LOWER(full_name) LIKE LOWER($1)",
        [`%${query}%`]
      );
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    // Return all matches (could be multiple people with same name)
    return res.status(200).json(result.rows);

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
