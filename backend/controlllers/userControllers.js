import db from "../database/db.js";

// Get all users
const getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error retrieving users:", err);
      res.status(500).json({ error: "Error retrieving users" });
      return;
    }

    res.json(results);
  });
};

// Get user by ID
const getUserById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error retrieving user:", err);
      res.status(500).json({ error: "Error retrieving user" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(results[0]);
  });
};

// Create a new user
const createUser = (req, res) => {
  const { username, email, password } = req.body;

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, results) => {
      if (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Error creating user" });
        return;
      }

      const newUser = { id: results.insertId, username, email, password };
      res.json(newUser);
    }
  );
};

// Update a user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  db.query(
    "UPDATE users SET username = ?, password = ? WHERE id = ?",
    [username, password, id],
    (err, results) => {
      if (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Error updating user" });
        return;
      }

      res.json({ message: "User updated successfully" });
    }
  );
};

// Delete a user
const deleteUser = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Error deleting user" });
      return;
    }

    res.json({ message: "User deleted successfully" });
  });
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
