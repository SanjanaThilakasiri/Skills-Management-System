const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/personal/:id/skills", (req, res) => {
  const personal_id = req.params.id;
  const { skills_id, proficiency } = req.body;

  const sql = `
    INSERT INTO personnel_skills (personal_id, skills_id, proficiency)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [personal_id, skills_id, proficiency], (err, result) => {
    if (err) {
      console.error("Assign skill error:", err);
      return res.status(500).json({
        message: "Failed to assign skill",
        error: err.sqlMessage
      });
    }

    res.status(201).json({
      message: "Skill assigned successfully"
    });
  });
});

// GET assigned skills for a Personal
router.get("/personal/:id/skills", (req, res) => {
  const personalId = req.params.id;

  const sql = `
    SELECT s.id, s.name, s.category, ps.proficiency
    FROM personnel_skills ps
    JOIN skills s ON ps.skills_id = s.id
    WHERE ps.personal_id = ?
  `;

  db.query(sql, [personalId], (err, result) => {
    if (err) {
      console.error("Fetch assigned skills error:", err);
      return res.status(500).json({ message: "Failed to fetch skills" });
    }
    res.json(result);
  });
});
