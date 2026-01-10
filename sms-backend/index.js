const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ");
});

//Personal Details Endpoints

app.post("/personal", (req, res) => {
  const { name, email, role, experience_level } = req.body;

  // basic validation
  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  const sql =
    "INSERT INTO personal (name, email, role, experience_level) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, role, experience_level], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "Personal details added successfully",
      id: result.insertId,
    });
  });
});

app.get("/personal", (req, res) => {
  const sql = "SELECT * FROM personal";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

app.put("/personal/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, role, experience_level } = req.body;

  const sql =
    "UPDATE personal SET name=?, email=?, role=?, experience_level=? WHERE id=?";

  db.query(
    sql,
    [name, email, role, experience_level, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Personal details not found" });
      }

      res.json({ message: "Personal details updated successfully" });
    }
  );
});

app.delete("/personal/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM personal WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Personal details not found" });
    }

    res.json({ message: "Personal details deleted successfully" });
  });
});

//Skills Endpoints

app.post("/skills", (req, res) => {
  const { name, category, description } = req.body;

  // basic validation
  if (!name) {
    return res.status(400).json({ message: "Skill name is required" });
  }

  const sql =
    "INSERT INTO skills (name, category, description) VALUES (?, ?, ?)";

  db.query(sql, [name, category, description], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "Skill added successfully",
      id: result.insertId
    });
  });
});

app.get("/skills", (req, res) => {
  const sql = "SELECT * FROM skills";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

app.put("/skills/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;

  const sql =
    "UPDATE skills SET name=?, category=?, description=? WHERE id=?";

  db.query(sql, [name, category, description, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill updated successfully" });
  });
});


app.delete("/skills/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM skills WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
