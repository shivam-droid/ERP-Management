import request from "supertest";
import app from "../app.js"; 
import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let server;
let token;


beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  const company = await db.Company.create({ name: "TechCorp" });
  const caRole = await db.Role.create({ name: "CA" });
  const managerRole = await db.Role.create({ name: "Manager" });

  const hashed = await bcrypt.hash("admin123", 10);
  const admin = await db.User.create({
    name: "Admin User",
    email: "admin@techcorp.com",
    password: hashed,
    company_id: company.id,
    role_id: caRole.id,
    is_deleted: false,
  });

  // Generate JWT token for CA user
  token = jwt.sign(
    {
      userId: admin.id,
      companyId: company.id,
      roleId: caRole.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Start express server
  server = app.listen(4001, () => console.log("Test server running"));
});

afterAll(async () => {
  await db.sequelize.close();
  server.close();
});

describe("User Management API Tests", () => {

  test("Login API should return token for valid credentials", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "admin@techcorp.com",
        password: "admin123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("GET /roles should return roles list", async () => {
    const response = await request(app).get("/roles");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /users/me should return logged-in user's profile", async () => {
    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("email", "admin@techcorp.com");
  });

  test("POST /users should create a new user under same company", async () => {
    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ravi Sharma",
        email: "ravi@techcorp.com",
        password: "ravi123",
        role_id: 2, // manager
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("email", "ravi@techcorp.com");
  });

  test("GET /users should return company users with pagination", async () => {
    const response = await request(app)
      .get("/users?page=1&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
