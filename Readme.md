# 🧩 ERP User Management System – Backend (Express + Sequelize + MySQL)

### 🚀 Overview
This project implements a **multi-tenant ERP backend system** for managing users, companies, and roles.  
Each company has its own internal users, managed by a **Company Admin (CA)**, with strict **role-based access** and **JWT authentication**.

---

## 🎯 Objective

Design and build a secure backend system to:
- Handle authentication (JWT)
- Allow Company Admins to create and manage internal users
- Restrict access by company (multi-tenant)
- Provide basic CRUD APIs for roles and users

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Language | **JavaScript (ESM)** |
| Backend Framework | **Express.js** |
| ORM | **Sequelize** |
| Database | **MySQL** |
| Authentication | **JWT (jsonwebtoken)** |
| Password Security | **bcryptjs** |
| Testing | **Jest + Supertest** |
| Environment Config | **dotenv** |

---

## 🗃️ Database Schema

### Tables
1. **Companies**  
   - id  
   - name  

2. **Roles**  
   - id  
   - name  

3. **Users**  
   - id  
   - name  
   - email  
   - password (hashed)  
   - company_id  
   - role_id  
   - created_by  
   - is_deleted  

### Relationships
- A **Company** has many **Users**  
- A **Role** has many **Users**  
- A **User** belongs to one **Company** and one **Role**  
- A **User** may be created by another **User (created_by)**

---

## 🔐 Authentication & Authorization

- **JWT Authentication**:  
  Each login generates a token containing `{ userId, companyId, roleId }`.  
  All protected APIs validate this token.

- **Role-Based Access**:
  - Only users with the **CA (Company Admin)** role can create new users.
  - Normal users can only view users from their own company.

---

## 🧱 API Endpoints

### 1️⃣ `POST /auth/login`
Authenticate user and return JWT token.

**Request:**
```json
{
  "email": "admin@techcorp.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 2️⃣ `POST /users`

Create a new user (CA only).

**Request:**
```json
{
  "name": "Ravi Sharma",
  "email": "ravi@techcorp.com",
  "password": "ravi123",
  "role_id": 2
}
```

**Response:**
```json
{
  "id": 2,
  "email": "ravi@techcorp.com",
  "company_id": 1,
  "created_by": 1
}
```

### 3️⃣ `GET /users`

Fetch all users from the same company with pagination.

**Request:**
```json
{
  "total": 2,
  "data": [
    { "id": 1, "name": "Company Admin" },
    { "id": 2, "name": "Ravi Sharma" }
  ]
}
```

### 4️⃣ `GET /users/me`

Returns the current logged-in user’s profile.

**Response:**
```json
{
  "id": 1,
  "name": "Company Admin",
  "email": "admin@techcorp.com",
  "Company": { "name": "TechCorp" },
  "Role": { "name": "CA" }
}
```

### 5️⃣ `GET /roles`

Fetch list of all roles.

**Response:**
```json
[
  { "id": 1, "name": "CA" },
  { "id": 2, "name": "Finance Manager" },
  { "id": 3, "name": "Store Manager" }
]
```

## ⚙️ Setup Instructions

### 1️⃣ `Clone the Repository`
```
git clone https://github.com/<your-username>/erp-user-management.git
cd erp-user-management
```

### 2️⃣ `Install Dependencies`
```
npm install
```

### 3️⃣ `Setup .env File`

Create .env in the project root:
```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=erp_system
JWT_SECRET=mysecretkey
```

### 4️⃣ `Setup Database`

Make sure MySQL is running, then create the database:
```
CREATE DATABASE erp_system;
```

### 5️⃣ `Run Migrations and Seed Data (optional)`
```
npx sequelize db:migrate
npx sequelize db:seed:all
```

### ▶️ `Run the Server`
```
npm start

```

## 🧪 Run Tests (Jest + Supertest)

All API endpoints are tested automatically.
```
npm test
```

## 🧠 Future Enhancements

- Add email verification for new users

- Implement pagination & filtering for companies

- Add audit logs for user activities

- Integrate Swagger for API documentation

## 👨‍💻 Developer

### Shivam Singhal