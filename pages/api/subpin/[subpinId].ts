import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { subpinId } = req.query;
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const subpin = await prisma.subpin.findUnique({ where: { topic: subpinId as string } });
				res.status(200).json({ success: true, subpin: subpin });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "PATCH":
			try {
				const subpin = await prisma.subpin.update({
					where: { id: subpinId as string },
					data: { count: req.body.count as number },
				});
				res.status(200).json({ success: true, subpin: subpin });
			} catch (error) {
				console.log("error: ", error);
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
