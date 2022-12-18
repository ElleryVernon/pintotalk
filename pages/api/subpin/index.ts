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
				const subpins = await prisma.subpin.findMany();
				res.status(200).json({ success: true, subpins: subpins });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				const { topic }: { topic: string } = req.body;;
				const subpin = await prisma.subpin.create({
					data: {
						topic: topic,
						count: 1,
						created_at: dbNow(),
					},
				});
				res.status(201).json({ success: true, subpin: subpin });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
