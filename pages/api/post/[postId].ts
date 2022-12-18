import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { postId } = req.query;
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const post = await prisma.post.findUnique({
					where: {
						id: postId as string,
					},
					include: {
						subpin: true,
						comments: true,
						crawl: true,
					},
				});
				res.status(200).json({ success: true, post: post });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
