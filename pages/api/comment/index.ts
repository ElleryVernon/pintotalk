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
				const comments = await prisma.comment.findMany({
					where: {
						post_id: req.query.post_id as string,
					},
				});
				res.status(200).json({ success: true, comments: comments });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				const comment = await prisma.comment.create({
					data: {
						post_id: req.body.post_id,
						wallet_address: req.body.wallet_address,
						text: req.body.text,
						created_at: dbNow(),
					},
				});
				res.status(201).json({ success: true, comment: comment });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
