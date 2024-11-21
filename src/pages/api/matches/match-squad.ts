import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { matchSquad } from "@/helper/helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const seriesId = req.query.seriesId;
		const matchId = req.query.matchId;

		const sport = await matchSquad(`${seriesId}`, `${matchId}`);

		// Check if sport.data.response is an object
		if (!sport || !sport.data || !sport.data.response) {
			return res.status(400).json({
				status: false,
				message: "Data not found or invalid",
				data: null,
			});
		}

		const data = sport.data.response;

		// Return the entire response data
		return res.json({
			status: true,
			message: "Data found successfully",
			data: data,
		});
	} catch (error: any) {
		console.log(error.message);
		return res.status(500).json({
			status: false,
			message: "Internal server error",
			data: null,
		});
	}
}
