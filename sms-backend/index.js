const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();


app.use(cors());
app.use(express.json());

const projectsRoutes = require("./routes/projectsRoutes");
app.use("/", projectsRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running ");
});

//Personal Details Endpoints

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

//Personal Skills Endpoints

app.post("/personal/:id/skills", (req, res) => {
  const personalId = req.params.id;
  const { skills_id, proficiency } = req.body;

  
  if (!skills_id || !proficiency) {
    return res.status(400).json({
      message: "Skill ID and proficiency are required"
    });
  }

  const sql =
    "INSERT INTO personnel_skills (personal_id, skills_id, proficiency) VALUES (?, ?, ?)";

  db.query(sql, [personalId, skills_id, proficiency], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "Skill assigned to personal details successfully",
      id: result.insertId
    });
  });
});


//Project Endpoints

app.post("/projects", (req, res) => {
  const { name, description, start_date, end_date, status } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  const sql =
    "INSERT INTO projects (name, description, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, description, start_date, end_date, status],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({
        message: "Project created successfully",
        id: result.insertId
      });
    }
  );
});

app.get("/projects", (req, res) => {
  const sql = "SELECT * FROM projects";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, start_date, end_date, status } = req.body;

  const sql =
    "UPDATE projects SET name=?, description=?, start_date=?, end_date=?, status=? WHERE id=?";

  db.query(
    sql,
    [name, description, start_date, end_date, status, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json({ message: "Project updated successfully" });
    }
  );
});


app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM projects WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  });
});

//Required skills for Projects Endpoints

app.post("/projects/:id/skills", (req, res) => {
  const projectId = req.params.id;
  const { skills_id, min_proficiency } = req.body;

 
  if (!skills_id || !min_proficiency) {
    return res.status(400).json({
      message: "Skill ID and minimum proficiency are required"
    });
  }

  const sql =
    "INSERT INTO project_required_skills (project_id, skills_id, min_proficiency) VALUES (?, ?, ?)";

  db.query(sql, [projectId, skills_id, min_proficiency], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Project ID or Skill ID does not exist" });
    }

    res.status(201).json({
      message: "Required skill added to project successfully",
      id: result.insertId
    });
  });
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});


