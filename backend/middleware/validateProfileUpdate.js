export function validateProfileUpdate(req, res, next) {
  const {
    firstName,
    lastName,
    username,
    bio,
  } = req.body;

  // Validate first name
  if (firstName !== undefined) {
    if (
      typeof firstName !== "string" ||
      firstName.trim() === ""
    ) {
      return res.status(400).json({
        message: "First name cannot be empty",
      });
    }

    if (firstName.trim().length > 50) {
      return res.status(400).json({
        message: "First name cannot exceed 50 characters",
      });
    }
  }

  // Validate last name
  if (lastName !== undefined) {
    if (
      typeof lastName !== "string" ||
      lastName.trim() === ""
    ) {
      return res.status(400).json({
        message: "Last name cannot be empty",
      });
    }

    if (lastName.trim().length > 50) {
      return res.status(400).json({
        message: "Last name cannot exceed 50 characters",
      });
    }
  }

  // Validate username
  if (username !== undefined) {
    if (
      typeof username !== "string" ||
      username.trim() === ""
    ) {
      return res.status(400).json({
        message: "Username cannot be empty",
      });
    }

    if (username.trim().length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters",
      });
    }

    if (username.trim().length > 30) {
      return res.status(400).json({
        message: "Username cannot exceed 30 characters",
      });
    }
  }

  // Validate bio
  if (bio !== undefined) {
    if (typeof bio !== "string") {
      return res.status(400).json({
        message: "Bio must be a string",
      });
    }

    if (bio.length > 500) {
      return res.status(400).json({
        message: "Bio cannot exceed 500 characters",
      });
    }
  }

  next();
}