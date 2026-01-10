# 📌 Skill Management System 
### (🚧 Work In Progress)
## 📖 Project Description

This is the backend part of a Skill Management System for a small consultancy or tech agency.
The system allows managing personal records and stores them in a MySQL database.
It is built using Node.js, Express.js, and MySQL and exposes REST APIs for CRUD operations.

## 🛠️ Technology Stack

- Backend: Node.js, Express.js

- Database: MySQL (MariaDB)

- Database Tool: phpMyAdmin (via XAMPP)

- API Testing: Thunder Client

## ✅ Features Implemented So Far
### 👤 Personal Management (CRUD)

- Create new personal

- Retrieve all personal

- Update personal details

- Delete personal records

### 🗄️ Database

- Database creation using SQL

- Tables with proper primary keys and foreign key readiness

- ENUM usage for experience levels
## 📂 Database Schema Overview
### Database Name - **sms_db**
### Tables Created

- personal

- skills

- personnel_skills

- projects

- project_required_skills


## 🔗 API Endpoints Implemented


### 1. Personal Details CRUD
#### ➕ Create Personal
```bash
POST /personal

```
#### 📥 Get All Personal

```bash
GET /personal

```

#### ✏️ Update Personal
```bash
PUT /personal/:id

```

#### 🗑️ Delete Personal

```bash
DELETE /personal/:id

```
### 2. Skills CRUD

#### ➕ Create Skill
```bash
POST /skills

```
#### 📥 Get All Skills

```bash
GET /skills

```

#### ✏️ Update Skill
```bash
PUT /skills/:id

```

#### 🗑️ Delete Skill

```bash
DELETE /skills/:id

```
### 3. Assign skills to personal details
```bash
POST /personal/:id/skills


```
## 🧪 API Testing

**All APIs were tested using Thunder Client.**
### 1. Personal Details CRUD
#### - Create personal (POST)
![Screenshot 2026-01-09 211622](https://github.com/user-attachments/assets/03d18726-d5a6-4db8-9fab-d2e565cff2d1)


#### - Retrieve personal list (GET)
![Screenshot 2026-01-09 212326](https://github.com/user-attachments/assets/323194fe-ab3d-412e-9c4f-9323770113dc)

#### - Update personal details (PUT)
![Screenshot 2026-01-09 212644](https://github.com/user-attachments/assets/959519c5-c395-4051-aecb-8a148f43a648)

#### - Delete personal record (DELETE)
![Screenshot 2026-01-09 213359](https://github.com/user-attachments/assets/f68685d3-20bb-4ba4-8ccb-17618465ecc8)

### 2. Skills CRUD

#### - Create Skill
![POST](https://github.com/user-attachments/assets/31c26578-b700-4ab7-a7c7-f5356abac97b)

#### - Retrive Skills list
![GET](https://github.com/user-attachments/assets/ddc78ba6-d02c-4851-a871-3a512f3306ea)

#### - Update Skill
![PUT](https://github.com/user-attachments/assets/47b7d30e-b07c-4c28-93c1-5dfd86480867)

#### - Delete Skill
![DELETE](https://github.com/user-attachments/assets/90db20d4-af8e-4bac-a06a-e2dddc76547f)

### 3. Assign skills to personal details
![POST](https://github.com/user-attachments/assets/002962ae-177d-476f-8cbb-a6ece69ef8be)

## ▶️ How to Run the Backend
> [!NOTE]
> Before running this project, make sure you have:

- Node.js (v16+ recommended)

- XAMPP installed

- MySQL service running

- Thunder Client or Postman
### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SanjanaThilakasiri/Skills-Management-System.git
cd sms-backend
```
### 2️⃣ Install Dependencies
```bash
npm install

```
### 3️⃣ Configure Database
- Start MySQL in XAMPP

- Import **database.sql** into phpMyAdmin

- Ensure database name is **sms_db**

### 4️⃣ Start the Server
```bash
node index.js

```
Expected output:
```bash
Database connected successfully 
Server running on port 5000

```

### 🚧 Work In Progress
### ✅ Next Step

👉 Implement Projects CRUD
