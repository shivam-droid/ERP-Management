export const isCompanyAdmin = (req, res, next) => {
  if (req.user.roleId !== 1) {
    return res
      .status(403)
      .json({ message: "Only Company Admins can perform this action" });
  }
  next();
};
