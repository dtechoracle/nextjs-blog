import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { auth } from "../../../../auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query;
  const session = auth;

  if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { content } = req.body;

    try {
      const comment = await prisma.comments.create({
        data: {
          postId: parseInt(postId as string, 10),
          userId: session.user,
          content,
        },
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create comment" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
