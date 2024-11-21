export default {
	// App
	secret: process.env.APP_SECRET || "",
	port: process.env.APP_PORT || 4008,
	base_url: process.env.NEXT_PUBLIC_BASE_URL,

	//Api
	odds_api: {
		base_url: process.env.ODDS_API_BASE_URL || "",
		ODDS_APIKEY:
			process.env.ODDS_API_APIKEY || "9c149fac5f69a873f75fe4822068574a",
	},

	//entity API
	entity_api: {
		base_url: process.env.ENTITY_API_BASE_URL || "",
		token: process.env.ENTITY_API_TOKEN || "825c773bd91875d296b9e153c26417d2",
		status: 1 || 2 || 3,
	},
};
