CREATE DATABASE sms_db;
USE sms_db;


CREATE TABLE personal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  experience_level ENUM('Intern','Junior', 'Mid-Level', 'Senior'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  description TEXT
);

CREATE TABLE personnel_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personal_id INT NOT NULL,
  skills_id INT NOT NULL,
  proficiency ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert'),

  FOREIGN KEY (personal_id) REFERENCES personal(id)
    ON DELETE CASCADE,

  FOREIGN KEY (skills_id) REFERENCES skills(id)
    ON DELETE CASCADE
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  status ENUM('Planning', 'Active', 'Completed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE project_required_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  skills_id INT NOT NULL,
  min_proficiency ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert'),

  FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE,

  FOREIGN KEY (skills_id) REFERENCES skills(id)
    ON DELETE CASCADE
);

