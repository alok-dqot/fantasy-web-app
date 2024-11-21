import env from "@/configs/env";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import matchList from "@/helper/helper";
import { client, seriesAPI } from "@/helper/helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const status = req.query.status || '';
		const per_page = req.query.per_page || '';
		const paged = req.query.paged || 1;

		const sport = await seriesAPI(`${status}`, `${per_page}`, `${paged}`);

		// Check if sport.data is an object and contains a response array
		if (!sport || !Array.isArray(sport.data.response.items)) {
			return res.status(400).json({
				status: false,
				message: "Data not found or invalid",
				data: null,
			});
		}

		// const cachedvalue = await client.get("data");
		// console.log("cachedvalue: ", cachedvalue);
		// if (cachedvalue) return res.json(JSON.parse(cachedvalue));

		const data = sport.data.response;

		// console.log("adfffjff");
		// await client.set("data", JSON.stringify(simplifiedData));
		// await client.expire("data", 50);

		console.log("data >>>>>>>>>>>>>>>>>>>: ", data);
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
