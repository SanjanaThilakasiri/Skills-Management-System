const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE project
router.post("/projects", (req, res) => {
  const { name, description, start_date, end_date, status } = req.body;

  const sql = `
    INSERT INTO projects (name, description, start_date, end_date, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, description, start_date, end_date, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Project created" });
  });
});

// GET all projects
router.get("/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD required skill to project
router.post("/projects/:id/skills", (req, res) => {
  const projectId = req.params.id;
  const { skills_id, min_proficiency } = req.body;

  const sql = `
    INSERT INTO project_required_skills (project_id, skills_id, min_proficiency)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [projectId, skills_id, min_proficiency], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Required skill added to project" });
  });
});

// MATCHING algorithm
router.get("/projects/:id/match", (req, res) => {
  const projectId = req.params.id;

  const sql = `
    SELECT 
      p.id AS person_id,
      p.name,
      p.role,
      s.name AS skill,
      ps.proficiency,
      prs.min_proficiency
    FROM personal p
    JOIN personnel_skills ps ON p.id = ps.personal_id
    JOIN skills s ON ps.skills_id = s.id
    JOIN project_required_skills prs ON s.id = prs.skills_id
    WHERE prs.project_id = ?
  `;

  db.query(sql, [projectId], (err, results) => {
    if (err) return res.status(500).json(err);

    const level = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
      Expert: 4
    };

    const matched = {};

    results.forEach(row => {
      if (level[row.proficiency] >= level[row.min_proficiency]) {
        if (!matched[row.person_id]) {
          matched[row.person_id] = {
            name: row.name,
            role: row.role,
            skills: []
          };
        }
        matched[row.person_id].skills.push(row.skill);
      }
    });

    res.json(Object.values(matched));
  });
});

module.exports = router;
