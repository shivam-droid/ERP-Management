import bcrypt from "bcryptjs";
import db from "../models/index.js";

const { User, Role, Company } = db;

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      company_id: req.user.companyId,
      role_id,
      created_by: req.user.userId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const users = await User.findAndCountAll({
    where: { company_id: req.user.companyId, is_deleted: false },
    include: [Role],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  res.json({
    total: users.count,
    data: users.rows,
  });
};

export const getMe = async (req, res) => {
  const user = await User.findByPk(req.user.userId, {
    include: [Company, Role],
  });
  res.json(user);
};
