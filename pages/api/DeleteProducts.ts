import prisma from "../../prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function AddProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const watchId = Number(req.query.watchId);

  try {
    await prisma.watches.delete({
      where: {
        id: watchId,
      },
    });

    res.status(200).json({ message: "Watch deleted successfully" });
  } catch (error) {
    console.error("Error updating database from api:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the watch" });
  }
}
