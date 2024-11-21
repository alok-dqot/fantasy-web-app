// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import env from "@/configs/env";
// import Client from "@/helper/api";
// import oddsApi from "@/helper/oddsApi";
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
// 	name: string;
// };

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse<Data>,
// ) {
// 	console.log("🚀 ~ env.odds_api.base_url:", env.odds_api.base_url);
// 	let api = await oddsApi.getSeries();
// 	console.log("🚀 ~ api:", api);
// 	return res.json({
// 		url: env.odds_api.base_url,
// 	} as any);
// }
