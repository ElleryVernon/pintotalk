import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const posts = await prisma.post.findMany({
					include: {
						comments: true,
						crawl: true,
					},
					orderBy: [
						{
							comments: {
								_count: "desc",
							},
						},
						{ created_at: "desc" },
					],
					take: 5,
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
