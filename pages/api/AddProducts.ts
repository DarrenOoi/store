import prisma from "../../prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function AddProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, text, image } = req.body;

  try {
    await prisma.watches.create({
      data: {
        name,
        text,
        image,
      },
    });

    res.status(200).json({ message: "Watch added successfully" });
  } catch (error) {
    console.error("Error updating database from api:", error);
    res.status(500).json({ error: "An error occurred while adding the watch" });
  }
}
