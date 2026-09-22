import { prisma } from "../prisma_db/prisma.js";

export async function sendMessage(req, res) {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        message: "Receiver and content are required",
      });
    }

    const receiver = await prisma.user.findUnique({
      where: {
        id: Number(receiverId),
      },
    });

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

        if (typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({
        message: "Message cannot be empty",
      });
    }

    if (content.length > 1000) {
      return res.status(400).json({
        message: "Message cannot exceed 1000 characters",
      });
    }

    if (senderId === Number(receiverId)) {
      return res.status(400).json({
        message: "You cannot send a message to yourself",
      });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        receiverId: Number(receiverId),
      },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to send message",
    });
  }
}

export async function getMessages(req, res) {
  try {
    const currentUserId = req.user.id;
    const otherUserId = Number(req.params.userId);

    if (Number.isNaN(otherUserId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const otherUser = await prisma.user.findUnique({
      where: {
        id: otherUserId,
      },
    });

    if (!otherUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: currentUserId,
            receiverId: otherUserId,
          },
          {
            senderId: otherUserId,
            receiverId: currentUserId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
}