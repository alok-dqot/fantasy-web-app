import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { MatchInfo, cricketOddsApi } from "@/helper/helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const query = req.query;

		const sport = await MatchInfo(`${query.id}`);

		const oddsData = await cricketOddsApi();

		if (!sport || !sport.data || !sport.data.response) {
			return res.status(400).json({
				status: false,
				message: "Data not found or invalid",
				data: null,
			});
		}

		const matchInfoData = sport.data.response;
		let matchedMatches = [];

		// Iterate through each match in the odds data
		for (const match of oddsData.data) {
			for (const bookmaker of match.bookmakers) {
				// Compare the home team and away team with teama and teamb
				if (
					matchInfoData.teama.name === match.home_team &&
					matchInfoData.teamb.name === match.away_team
				) {
					matchedMatches.push({
						matchInfo: matchInfoData,
						oddsData: match,
					});
				}
			}
		}

		// Return the matched matches
		return res.json({
			status: true,
			message: "Data found successfully",
			data: matchedMatches,
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
