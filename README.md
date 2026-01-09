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

**(Only personal CRUD is implemented so far)**
### ➕ Create Personal
```bash
POST /personal

```
### 📥 Get All Personal

```bash
GET /personal

```

### ✏️ Update Personal
```bash
PUT /personal/:id

```

### 🗑️ Delete Personal

```bash
DELETE /personal/:id

```

## 🧪 API Testing

**All APIs were tested using Thunder Client.**

### - Create personal (POST)
![Screenshot 2026-01-09 211622](https://github.com/user-attachments/assets/03d18726-d5a6-4db8-9fab-d2e565cff2d1)


### - Retrieve personal list (GET)
![Screenshot 2026-01-09 212326](https://github.com/user-attachments/assets/323194fe-ab3d-412e-9c4f-9323770113dc)

### - Update personal details (PUT)
![Screenshot 2026-01-09 212644](https://github.com/user-attachments/assets/959519c5-c395-4051-aecb-8a148f43a648)

### - Delete personal record (DELETE)
![Screenshot 2026-01-09 213359](https://github.com/user-attachments/assets/f68685d3-20bb-4ba4-8ccb-17618465ecc8)


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

👉 Implement Skills CRUD
