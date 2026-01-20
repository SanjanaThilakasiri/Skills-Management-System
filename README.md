# 📌 Skill Management System 
### (🚧 Work In Progress)

## 🛠️ Technology Stack

- Backend: Node.js, Express.js

- Database: MySQL (MariaDB)

- Database Tool: phpMyAdmin (via XAMPP)

- API Testing: Thunder Client

## 🗄️ Database


- Database creation using SQL

- Tables with proper primary keys and foreign key readiness

- ENUM usage for experience levels
## 📂 Database Schema Overview
### ER Diagram
**Designed via lucidchart.com**
<img width="2576" height="2332" alt="Blank board (3)" src="https://github.com/user-attachments/assets/756551a4-a365-4736-ad2d-38e343215c46" />
**Designed via lucidchart.com**
```bash
https://lucid.app/lucidspark/11d881a1-0415-48ef-afb3-06a436f95544/edit?viewport_loc=259%2C734%2C2591%2C1330%2C0_0&invitationId=inv_7b700f39-de94-4c11-af64-4862da2def6d

```
<img width="967" height="665" alt="Untitled (2)" src="https://github.com/user-attachments/assets/9ccacde0-bbc1-45ec-87d4-b3298577ad19" />


**Designed via dbdiagram.io**

### Database Name - **sms_db**
### Tables Created

- personal

- skills

- personal_skills

- projects

- project_required_skills

## Backend

## 🔗 API Endpoints Implemented
**All APIs were tested using Thunder Client.**


### 1. Personal Details CRUD
#### ➕ Create Personal
```bash
POST /personal

```
![Screenshot 2026-01-09 211622](https://github.com/user-attachments/assets/03d18726-d5a6-4db8-9fab-d2e565cff2d1)
#### 📥 Get All Personal

```bash
GET /personal

```
![Screenshot 2026-01-09 212326](https://github.com/user-attachments/assets/323194fe-ab3d-412e-9c4f-9323770113dc)
#### ✏️ Update Personal
```bash
PUT /personal/:id

```
![Screenshot 2026-01-09 212644](https://github.com/user-attachments/assets/959519c5-c395-4051-aecb-8a148f43a648)
#### 🗑️ Delete Personal

```bash
DELETE /personal/:id

```
![Screenshot 2026-01-09 213359](https://github.com/user-attachments/assets/f68685d3-20bb-4ba4-8ccb-17618465ecc8)
### 2. Skills CRUD

#### ➕ Create Skill
```bash
POST /skills

```
![POST](https://github.com/user-attachments/assets/31c26578-b700-4ab7-a7c7-f5356abac97b)
#### 📥 Get All Skills

```bash
GET /skills

```
![GET](https://github.com/user-attachments/assets/ddc78ba6-d02c-4851-a871-3a512f3306ea)
#### ✏️ Update Skill
```bash
PUT /skills/:id

```
![PUT](https://github.com/user-attachments/assets/47b7d30e-b07c-4c28-93c1-5dfd86480867)

#### 🗑️ Delete Skill

```bash
DELETE /skills/:id

```
![DELETE](https://github.com/user-attachments/assets/90db20d4-af8e-4bac-a06a-e2dddc76547f)
### 3. Assign skills to personal details
```bash
POST /personal/:id/skills

```
![POST](https://github.com/user-attachments/assets/002962ae-177d-476f-8cbb-a6ece69ef8be)
### 4. Personal Skills
```bash
POST /personal/:id/skills

```
![POST](https://github.com/user-attachments/assets/78238b1e-e415-4c93-b482-356a7c317b75)

### 5. Projects CRUD
#### ➕ Create Project
```bash
POST /projects

```
![POST](https://github.com/user-attachments/assets/f7cee8a9-1a2a-4517-bc04-5d4e4ea15acd)

#### 📥 Get All Projects

```bash
GET /projects

```
![GET](https://github.com/user-attachments/assets/c31ff8c6-4c6c-4bc0-be60-b9164d96390f)


#### ✏️ Update Project
```bash
PUT /projects/:id

```
![PUT](https://github.com/user-attachments/assets/22894da4-fc11-4f24-8469-daeb0dc8e29e)

#### 🗑️ Delete Projects

```bash
DELETE /projects/:id

```
![DELETE](https://github.com/user-attachments/assets/55174612-fa43-4a9b-ba11-9c40ea2dca00)

### 6. Required Skills
```bash
POST /projects/:id/skills

```
![GET](https://github.com/user-attachments/assets/e8788f03-11b9-4ff3-bc0b-b895abcceac5)

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

👉 Create Frontend UI
