import pool from "../config/db.js";

export const getSubscriber = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const result = await pool.query(
      "SELECT * FROM people WHERE phone_number = $1",
      [phone]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    const subscriber = result.rows[0];
    
    // Format the document number from scientific notation to full string
    const formattedSubscriber = {
      phone_number: subscriber.phone_number,
      full_name: subscriber.full_name,
      date_of_birth: subscriber.date_of_birth,
      document_number: convertScientificToFull(subscriber.document_number),
      document_expiry: subscriber.document_expiry,
      location: subscriber.location,
      operator: subscriber.operator
    };

    res.json(formattedSubscriber);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Convert scientific notation to full number string
function convertScientificToFull(docNumber) {
  if (!docNumber) return '';
  
  // If it's already a string, return as is
  if (typeof docNumber === 'string') {
    return docNumber;
  }
  
  // If it's a number in scientific notation, convert it
  if (typeof docNumber === 'number') {
    // Convert to string without scientific notation
    return docNumber.toLocaleString('fullwide', { useGrouping: false });
  }
  
  return docNumber.toString();
}