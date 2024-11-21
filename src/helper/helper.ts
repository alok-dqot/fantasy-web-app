import axios, { AxiosResponse } from "axios";
import redis from "ioredis";

import env from "@/configs/env";

const baseURL = env.entity_api.base_url;
const token = env.entity_api.token;
// const status = env.entity_api.status;

const ODDSbaseURL = env.odds_api.base_url;
const ODDSApiKey = env.odds_api.ODDS_APIKEY;

export const client = new redis(
	"rediss://default:89c0f84eacae4c78bf4c22921c8b9c90@us1-crack-snapper-38627.upstash.io:38627",
);

async function matchList(
	status: number | string,
	per_page: number = 5,
): Promise<any> {
	try {
		const response: AxiosResponse<any> = await axios.get(
			`${baseURL}/matches/?status=${status}&format=6&token=${token}&per_page=${per_page}`,
		);
		return response; // Assuming you want to return the data fetched
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Rethrow the error to handle it in the calling code
	}
}

async function MatchInfo(id: string): Promise<any> {
	try {
		const response: AxiosResponse<any> = await axios.get(
			`${baseURL}/matches/${id}/info?token=${token}`,
		);
		return response; // Assuming you want to return the data fetched
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Rethrow the error to handle it in the calling code
	}
}

async function liveMatch(id: string): Promise<any> {
	try {
		const response: AxiosResponse<any> = await axios.get(
			`${baseURL}/matches/${id}/live?token=${token}`,
		);
		return response; // Assuming you want to return the data fetched
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Rethrow the error to handle it in the calling code
	}
}

async function matchScorecard(id: string): Promise<any> {
	try {
		const response: AxiosResponse<any> = await axios.get(
			`${baseURL}/matches/${id}/scorecard?token=${token}`,
		);
		return response; // Assuming you want to return the data fetched
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Rethrow the error to handle it in the calling code
	}
}

async function matchSquad(seriesId: string, matchId: string): Promise<any> {
	try {
		const response: AxiosResponse<any> = await axios.get(
			`${baseURL}/competitions/${seriesId}/squads/${matchId}?token=${token}`,
		);
		return response; // Assuming you want to return the data fetched
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Rethrow the error to handle it in the calling code
	}
}

async function matchesOdssAPI(): Promise<any> {
	try {
		const response: AxiosResponse<any> = await axios.get(
			` ${ODDSbaseURL}/sports/?apiKey=${ODDSApiKey}`,
		);
		return response; // Assuming you want to return the data fetched
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Rethrow the error to handle it in the calling code
	}
}

async function cricketOddsApi(): Promise<any> {
	try {
		const response: AxiosResponse<any> = await axios.get(
			` ${ODDSbaseURL}/sports/cricket_ipl/odds/?apiKey=${ODDSApiKey}&regions=us&markets=h2h `,
		);
		return response; // Assuming you want to return the data fetched
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Rethrow the error to handle it in the calling code
	}
}

async function seriesAPI(
	status: number | string,
	per_page: any = 5,
	paged: any = 1,
): Promise<any> {
	try {
		const response: AxiosResponse<any> = await axios.get(
			// `${baseURL}/matches/?status=${status}&format=6&token=${token}`,
			`${baseURL}/competitions/?token=${token}&per_page=${per_page}&paged=${paged}&status=${status}`,
		);
		return response; // Assuming you want to return the data fetched
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Rethrow the error to handle it in the calling code
	}
}

export {
	matchList as default,
	MatchInfo,
	liveMatch,
	matchScorecard,
	matchSquad,
	matchesOdssAPI,
	cricketOddsApi,
	seriesAPI,
};
