import { prisma } from "../prisma_db/prisma.js";

export async function getUsers(req, res) {
  try {
    const search = req.query.search?.trim();

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: req.user.id,
        },

        ...(search && {
          OR: [
            {
              username: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              firstName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },

      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
      },

      orderBy: {
        firstName: "asc",
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
}

export async function getUser(req, res) {
  try {
    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;

    const {
      firstName,
      lastName,
      username,
      bio,
    } = req.body;

    if (username !== undefined) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: username.trim(),
          NOT: {
            id: userId,
          },
        },
      });

      if (existingUser) {
        return res.status(409).json({
          message: "Username is already taken",
        });
      }
    }

    const data = {};

    if (firstName !== undefined) {
      data.firstName = firstName.trim();
    }

    if (lastName !== undefined) {
      data.lastName = lastName.trim();
    }

    if (username !== undefined) {
      data.username = username.trim();
    }

    if (bio !== undefined) {
      data.bio = bio.trim();
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No profile fields were provided",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
}