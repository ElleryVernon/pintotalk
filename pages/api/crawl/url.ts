import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { url } = req.query;
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				console.log("url: ", url);
				const crawl = await prisma.crawl.findUnique({
					where: {
						url: url as string,
					},
				});
				res.status(200).json({ success: true, crawl: crawl });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
