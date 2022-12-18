import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { crawlId } = req.query;
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const crawl = await prisma.crawl.findUnique({
					where: {
						id: crawlId as string,
					},
				});
				res.status(200).json({ success: true, crawl: crawl });
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
