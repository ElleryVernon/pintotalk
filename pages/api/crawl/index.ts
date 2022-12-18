import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const dbNow = () => dayjs().add(9, "hour").toDate();
	const { method } = req;

	switch (method) {
		case "POST":
			try {
				const crawl = await prisma.crawl.create({
					data: {
						url: req.body.crawl_url,
						title: req.body.crawl_title,
						description: req.body.crawl_description || "설명이 없는 페이지에요",
						thumbnail: req.body.crawl_thumbnail || "https://avatars.dicebear.com/api/miniavs/%EC%97%86%EC%9D%8C.svg",
						created_at: dbNow(),
					},
				});
				res.status(201).json({ success: true, crawl: crawl });
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
