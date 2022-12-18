import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { topic } = req.query;
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const posts = await prisma.post.findMany({
					where: {
						subpin: { topic: topic as string },
					},
					include: {
						subpin: true,
						comments: true,
						crawl: true,
					},
				});
				res.status(200).json({ success: true, posts: posts });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
