import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import matchList from "@/helper/helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		let live = await matchList(3, 5);
		// Check if sport.data is an object and contains a response array
		if (!live || !Array.isArray(live.data.response.items)) {
			live = [];
		}

		//
		let upcoming = await matchList(1, 5);
		// Check if sport.data is an object and contains a response array
		if (!upcoming || !Array.isArray(upcoming.data.response.items)) {
			upcoming = [];
		}

		let completed = await matchList(2, 5);
		// Check if sport.data is an object and contains a response array
		if (!completed || !Array.isArray(completed.data.response.items)) {
			completed = [];
		}

		const result = [
			...live.data.response.items,
			...upcoming.data.response.items,
			...completed.data.response.items,
		];

		return res.json({
			status: true,
			message: `Matches with status found successfully`,
			data: result,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: "Internal server error",
			data: null,
		});
	}
}
