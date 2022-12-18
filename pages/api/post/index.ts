import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const dbNow = () => dayjs().add(9, "hour").toDate();
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const posts = await prisma.post.findMany({
					orderBy: [{ created_at: "desc" }],
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
		case "POST":
			try {
				const post = await prisma.post.create({
					data: {
						title: req.body.title,
						body: req.body.body,
						subpin_id: req.body.subpin_id,
						crawl_id: req.body.crawl_id,
						wallet_address: req.body.wallet_address,
						created_at: dbNow(),
					},
					include: {
						subpin: true,
						comments: true,
						votes: true,
					},
				});
				res.status(201).json({ success: true, post: post });
			} catch (error) {
				console.error(req.body);
				console.error(error);
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
