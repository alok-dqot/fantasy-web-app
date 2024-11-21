import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { matchSquad } from "@/helper/helper";
import Squads from "../../../../../@fake/squad.json";
import { client } from "@/helper/helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const { id } = req.query;
		const teamId = parseInt(id as string); // Parse id as integer

		// Check if teamId is a valid integer
		if (isNaN(teamId) || !Number.isInteger(teamId)) {
			return res.status(400).json({
				status: false,
				message: "Invalid team ID",
				data: null,
			});
		}

		const teamData = await client.get(`team:${teamId}`);

		if (!teamData) {
			return res.status(404).json({
				status: false,
				message: "Team not found",
				data: null,
			});
		}

		const parsedTeamData = JSON.parse(teamData);

		return res.json({
			status: true,
			message: "Team data found successfully",
			data: parsedTeamData,
		});
	} catch (error: any) {
		console.error("Error:", error.message);
		return res.status(500).json({
			status: false,
			message: "Internal server error",
			data: null,
		});
	}
}
