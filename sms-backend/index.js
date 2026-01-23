const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// -------------------------
// Personal Endpoints
// -------------------------

// Create Personal
app.post("/personal", (req, res) => {
  const { name, email, role, experience_level } = req.body;

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

// Get all Personal
app.get("/personal", (req, res) => {
  const sql = "SELECT * FROM personal";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

// Update Personal
app.put("/personal/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, role, experience_level } = req.body;

  const sql =
    "UPDATE personal SET name=?, email=?, role=?, experience_level=? WHERE id=?";
  db.query(sql, [name, email, role, experience_level, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Personal details not found" });

    res.json({ message: "Personal details updated successfully" });
  });
});

// Delete Personal
app.delete("/personal/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM personal WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Personal details not found" });

    res.json({ message: "Personal details deleted successfully" });
  });
});

// -------------------------
// Skills Endpoints
// -------------------------

// Create Skill
app.post("/skills", (req, res) => {
  const { name, category, description } = req.body;

  if (!name) return res.status(400).json({ message: "Skill name is required" });

  const sql = "INSERT INTO skills (name, category, description) VALUES (?, ?, ?)";
  db.query(sql, [name, category, description], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(201).json({ message: "Skill added successfully", id: result.insertId });
  });
});

// Get all Skills
app.get("/skills", (req, res) => {
  const sql = "SELECT * FROM skills";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

// Update Skill
app.put("/skills/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;

  const sql = "UPDATE skills SET name=?, category=?, description=? WHERE id=?";
  db.query(sql, [name, category, description, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Skill not found" });

    res.json({ message: "Skill updated successfully" });
  });
});

// Delete Skill
app.delete("/skills/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM skills WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Skill not found" });

    res.json({ message: "Skill deleted successfully" });
  });
});

// -------------------------
// Personal Skills Endpoints
// -------------------------

// Assign Skill to Personal
app.post("/personal/:id/skills", (req, res) => {
  const personalId = req.params.id;
  const { skills_id, proficiency } = req.body;

  if (!skills_id || !proficiency) {
    return res.status(400).json({ message: "Skill ID and proficiency are required" });
  }

  const sql =
    "INSERT INTO personnel_skills (personal_id, skills_id, proficiency) VALUES (?, ?, ?)";
  db.query(sql, [personalId, skills_id, proficiency], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.sqlMessage });
    res.status(201).json({ message: "Skill assigned to personal successfully", id: result.insertId });
  });
});

// GET assigned skills for a Personal
app.get("/personal/:id/skills", (req, res) => {
  const personalId = req.params.id;

  const sql = `
    SELECT s.id, s.name, s.category, ps.proficiency
    FROM personnel_skills ps
    JOIN skills s ON ps.skills_id = s.id
    WHERE ps.personal_id = ?
  `;

  db.query(sql, [personalId], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to fetch skills", error: err.sqlMessage });
    res.json(result);
  });
});

// -------------------------
// Project Endpoints
// -------------------------

app.post("/projects", (req, res) => {
  const { name, description, start_date, end_date, status } = req.body;
  if (!name) return res.status(400).json({ message: "Project name is required" });

  const sql =
    "INSERT INTO projects (name, description, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, description, start_date, end_date, status], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(201).json({ message: "Project created successfully", id: result.insertId });
  });
});

app.get("/projects", (req, res) => {
  const sql = "SELECT * FROM projects";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, start_date, end_date, status } = req.body;

  const sql =
    "UPDATE projects SET name=?, description=?, start_date=?, end_date=?, status=? WHERE id=?";
  db.query(sql, [name, description, start_date, end_date, status, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project updated successfully" });
  });
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM projects WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  });
});

// Add Required Skills to Project
app.post("/projects/:id/skills", (req, res) => {
  const projectId = req.params.id;
  const { skills_id, min_proficiency } = req.body;

  if (!skills_id || !min_proficiency)
    return res.status(400).json({ message: "Skill ID and minimum proficiency are required" });

  const sql =
    "INSERT INTO project_required_skills (project_id, skills_id, min_proficiency) VALUES (?, ?, ?)";
  db.query(sql, [projectId, skills_id, min_proficiency], (err, result) => {
    if (err) return res.status(500).json({ message: "Project ID or Skill ID does not exist" });
    res.status(201).json({ message: "Required skill added to project successfully", id: result.insertId });
  });
});
app.get("/projects/:id/skills", (req, res) => {
  const projectId = req.params.id;

  const sql = `
    SELECT s.id, s.name, s.category, prs.min_proficiency
    FROM project_required_skills prs
    JOIN skills s ON prs.skills_id = s.id
    WHERE prs.project_id = ?
  `;

  db.query(sql, [projectId], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch project skills", error: err.sqlMessage });
    res.json(results);
  });
});

// Matching Algorithm
app.get("/projects/:id/match", (req, res) => {
  const projectId = req.params.id;

  const sql = `
    SELECT p.id AS personal_id, p.name, p.role,
           GROUP_CONCAT(CONCAT(s.name, ' (', ps.proficiency, ')') SEPARATOR ', ') AS skills,
           COUNT(ps.skills_id) AS matched_skills,
           (COUNT(ps.skills_id)/(
             SELECT COUNT(*) FROM project_required_skills WHERE project_id = ?
           ) * 100) AS match_percentage
    FROM personal p
    JOIN personnel_skills ps ON p.id = ps.personal_id
    JOIN project_required_skills prs ON ps.skills_id = prs.skills_id
    JOIN skills s ON ps.skills_id = s.id
    WHERE prs.project_id = ? AND
          (ps.proficiency='Expert' OR ps.proficiency='Advanced' OR ps.proficiency='Intermediate' OR ps.proficiency='Beginner')
    GROUP BY p.id
    HAVING matched_skills = (SELECT COUNT(*) FROM project_required_skills WHERE project_id = ?)
  `;

  db.query(sql, [projectId, projectId, projectId], (err, results) => {
    if (err) return res.status(500).json({ message: "Matching failed", error: err.sqlMessage });

    // Transform skills string into array
    const formatted = results.map((r) => ({
      personal_id: r.personal_id,
      name: r.name,
      role: r.role,
      skills: r.skills.split(", ").map((s) => {
        const [name, proficiency] = s.match(/(.*) \((.*)\)/).slice(1);
        return { name, proficiency };
      }),
      match_percentage: Math.round(r.match_percentage),
    }));

    res.json(formatted);
  });
});

// -------------------------
// Root
// -------------------------
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// -------------------------
// Start server
// -------------------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
