import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { matchScorecard } from "@/helper/helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const query = req.query;
		// Call the helper function to fetch the data
		const sport = await matchScorecard(`${query.id}`);

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
