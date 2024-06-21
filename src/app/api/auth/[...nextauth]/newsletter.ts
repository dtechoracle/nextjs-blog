import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;
    try {
      const newSignup = await prisma.newsletterSignup.create({
        data: { email },
      });
      res.status(201).json(newSignup);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Email already exists or invalid request" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
