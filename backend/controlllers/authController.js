import db from "../database/db.js";

// Register a user
const registerUser = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Error registering user" });
        return;
      }

      const newUser = { id: results.insertId, username };
      res.json(newUser);
    }
  );
};

// Login a user
const loginUser = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Error logging in" });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const user = results[0];
      if (user.username !== username) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      if (user.password !== password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      res.json(user);
    }
  );
};




export { registerUser, loginUser };