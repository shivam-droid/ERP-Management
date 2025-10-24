import db from "../models/index.js";
const { Role } = db;

export const getRoles = async (req, res) => {
  const roles = await Role.findAll();
  res.json(roles);
};
