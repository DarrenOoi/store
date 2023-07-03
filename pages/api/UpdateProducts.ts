import prisma from "../../prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function UpdateProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Oldname, text, name } = req.body;

  try {
    await prisma.watches.updateMany({
      where: {
        name: Oldname,
      },
      data: {
        name,
        text,
      },
    });

    res.status(200).json({ message: "Watch updated successfully" });
  } catch (error) {
    console.error("Error updating database from api:", error);
    res.status(500).json({ error: "An error occurred while adding the watch" });
  }
}
