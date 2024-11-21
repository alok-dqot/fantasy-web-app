import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { matchSquad } from "@/helper/helper";
import Squads from "../../../../../@fake/squad.json";
import { client } from "@/helper/helper";
import { randomInRange } from "@/helper/common";

// Shuffle array in place
function shuffleArray<T>(array: T) {
	let arr: any = array;
	for (let i = (array as any)?.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const query = req.query;
		// Call the helper function to fetch the data
		// const sport = await matchSquad(`${query.series_id}`, `${query.id}`);

		// const squads_data = squads;
		let uniqueId = (await client.get("team_counter")) as any;
		if (!uniqueId) {
			await client.set("team_counter", 1);
			uniqueId = 1;
		} else {
			await client.incr("team_counter");
		}
		const cachedvalue = await client.get(`team:${uniqueId}`);
		console.log("cachedvalue: ", cachedvalue);

		const roles = shuffleArray(["WK", "BAT", "ALL", "BOWL"]);

		const positions: any = {
			WK: { min: 1, max: 2 },
			BAT: { min: 3, max: 4 },
			ALL: { min: 1, max: 2 },
			BOWL: { min: 3, max: 3 },
		};

		// for(let i = 0; i < roles.length; i++){

		// }

		let minPlayers = 11;
		const maxPlayerPerTeam = 10;

		const data: any = {};

		// lineup_announced: 1,
		const squadsCountLastPlayed = Squads.squads.reduce(
			(a, item) => a + item.last_match_played.length,
			0,
		);

		const squadsCount = Squads.squads.reduce(
			(a, item) => a + item.players.length,
			0,
		);

		let squads = shuffleArray(Squads.squads.map((item) => item.players).flat());

		const team = [] as Array<typeof squads>;
		const captain_index = randomInRange(0, 10);
		console.log("🚀 ~ captain_index:", captain_index);
		let vice_captain_index = randomInRange(0, 10);
		while (captain_index === vice_captain_index) {
			vice_captain_index = randomInRange(0, 10);
		}
		console.log("🚀 ~ vice_captain_index:", vice_captain_index);
		let j = 0;
		for (let i = 0; i < squads.length; i++) {
			if (team.length >= minPlayers) continue;
			let player = squads[i];

			const playerRole = `${player.playing_role}`.toUpperCase();
			const position = positions[playerRole];

			const teamRolePlayers = team.filter((f) => f.playing_role == playerRole);

			if (teamRolePlayers.length >= position.max) {
				continue;
			}

			player.is_captain = false;
			player.is_vice_captain = false;

			if (j == captain_index) {
				player.is_captain = true;
			}
			if (j == vice_captain_index) {
				player.is_vice_captain = true;
			}

			team.push(player);
			j++;
		}

		data.players = team;
		data.length = team.length;

		// console.log("adfffjff");
		// await client.set("data", JSON.stringify(data));
		// await client.expire("data", 50);

		console.log(await client.set(`team:${uniqueId}`, JSON.stringify(data)));

		// Return the entire response data
		return res.json({
			status: true,
			message: "Data found successfully",
			data: {
				teamId: uniqueId,
				team: data,
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
