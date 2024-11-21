import env from "@/configs/env";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { MatchInfo, cricketOddsApi, liveMatch } from "@/helper/helper";

// match live
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const query = req.query;

		// Call the helper function to fetch the data
		const sport = await liveMatch(`${query.id}`);
		const odds = await cricketOddsApi();

		// Check if sport.data.response is an object
		if (!sport || !sport.data || !sport.data.response) {
			return res.status(400).json({
				status: false,
				message: "Data not found or invalid",
				data: null,
			});
		}

		const data = sport.data.response;
		const oddsdata = odds.data;

		// Return the entire response data
		return res.json({
			status: true,
			message: "Data found successfully",
			data: {
				...data,
				odds: oddsdata,
			},

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
