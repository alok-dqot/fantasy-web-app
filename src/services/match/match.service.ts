import { create } from "zustand";
import { combine } from "zustand/middleware";
import toast from "react-hot-toast";
import Api from "@/api/Api";
import { MatchScoreCard } from "@/types/MatchScoreCard";

export interface Match {
	match_id: number;
	title: string;
	short_title: string;
	subtitle: string;
	match_number: string;
	format: number;
	format_str: string;
	status: number;
	status_str: string;
	status_note: string;
	verified: string;
	pre_squad: string;
	odds_available: string;
	game_state: number;
	game_state_str: string;
	domestic: string;
	competition: Competition;
	teama: Teama;
	teamb: Teamb;
	date_start: string;
	date_end: string;
	timestamp_start: number;
	timestamp_end: number;
	date_start_ist: string;
	date_end_ist: string;
	venue: Venue;
	umpires: string;
	referee: string;
	equation: string;
	live: string;
	result: string;
	result_type: number;
	win_margin: string;
	winning_team_id: number;
	commentary: number;
	wagon: number;
	latest_inning_number: number;
	presquad_time: string;
	verify_time: string;
	match_dls_affected: string;
	day: string;
	session: string;
	weather: Weather;
	pitch: Pitch;
	toss: Toss;
}

export interface Competition {
	cid: number;
	title: string;
	abbr: string;
	type: string;
	category: string;
	match_format: string;
	season: string;
	status: string;
	datestart: string;
	dateend: string;
	country: string;
	total_matches: string;
	total_rounds: string;
	total_teams: string;
}

export interface Teama {
	team_id: number;
	name: string;
	short_name: string;
	logo_url: string;
	scores_full: string;
	scores: string;
	overs: string;
}

export interface Teamb {
	team_id: number;
	name: string;
	short_name: string;
	logo_url: string;
	scores_full: string;
	scores: string;
	overs: string;
}

export interface Venue {
	venue_id: string;
	name: string;
	location: string;
	country: string;
	timezone: string;
}

export interface Weather {
	weather: string;
	weather_desc: string;
	temp: number;
	humidity: number;
	visibility: number;
	wind_speed: string;
	clouds: number;
}

export interface Pitch {
	pitch_condition: string;
	batting_condition: string;
	pace_bowling_condition: string;
	spine_bowling_condition: string;
}

export interface Toss {
	text: string;
	winner: number;
	decision: number;
}

export interface MatchLive {
	mid: number;
	status: number;
	status_str: string;
	game_state: number;
	game_state_str: string;
	status_note: string;
	day_remaining_over: string;
	team_batting: string;
	team_bowling: string;
	live_inning_number: number;
	live_score: LiveScore;
	commentary: number;
	wagon: number;
	batsmen: Batsmen[];
	bowlers: Bowler[];
	commentaries: Commentary[];
	day: string;
	session: string;
	live_inning: LiveInning;
	teams: Team[];
	players: Player[];
}

export interface LiveScore {
	runs: number;
	overs: number;
	wickets: number;
	target: number;
	runrate: number;
	required_runrate: number;
}

export interface Batsmen {
	name: string;
	batsman_id: number;
	runs: number;
	balls_faced: number;
	fours: number;
	sixes: number;
	strike_rate: string;
}

export interface Bowler {
	name: string;
	bowler_id: number;
	overs: number;
	runs_conceded: number;
	wickets: number;
	maidens: number;
	econ: string;
}

export interface Commentary {
	event: string;
	over: any;
	runs?: number;
	score: any;
	bats?: Bat[];
	bowls?: Bowl[];
	commentary: string;
	event_id?: string;
	batsman_id?: string;
	bowler_id?: string;
	ball?: string;
	noball_dismissal?: boolean;
	text?: string;
	timestamp?: number;
	run?: number;
	noball_run?: string;
	wide_run?: string;
	bye_run?: string;
	legbye_run?: string;
	bat_run?: string;
	noball?: boolean;
	wideball?: boolean;
	six?: boolean;
	four?: boolean;
	wicket_batsman_id?: string;
	how_out?: string;
	batsman_runs?: string;
	batsman_balls?: string;
}

export interface Bat {
	runs: number;
	balls_faced: number;
	fours: number;
	sixes: number;
	batsman_id: number;
}

export interface Bowl {
	runs_conceded: number;
	maidens: number;
	wickets: number;
	bowler_id: number;
	overs: number;
}

export interface LiveInning {
	iid: number;
	number: number;
	name: string;
	short_name: string;
	status: number;
	issuperover: string;
	result: number;
	batting_team_id: number;
	fielding_team_id: number;
	scores: string;
	scores_full: string;
	fielder: Fielder[];
	powerplay: any[];
	review: Review;
	last_wicket: LastWicket;
	extra_runs: ExtraRuns;
	equations: Equations;
	current_partnership: CurrentPartnership;
	did_not_bat: any[];
	max_over: string;
	target: string;
	recent_scores: string;
	last_five_overs: string;
	last_ten_overs: string;
}

export interface Fielder {
	fielder_id: string;
	fielder_name: string;
	catches: number;
	runout_thrower: number;
	runout_catcher: number;
	runout_direct_hit: number;
	stumping: number;
	is_substitute: string;
}

export interface Review {
	batting: Batting;
	bowling: Bowling;
}

export interface Batting {
	batting_team_total_review: string;
	batting_team_review_success: string;
	batting_team_review_failed: string;
	batting_team_review_available: string;
}

export interface Bowling {
	bowling_team_total_review: string;
	bowling_team_review_success: string;
	bowling_team_review_failed: string;
	bowling_team_review_available: string;
}

export interface LastWicket {
	name: string;
	batsman_id: string;
	runs: string;
	balls: string;
	how_out: string;
	score_at_dismissal: number;
	overs_at_dismissal: string;
	bowler_id: string;
	dismissal: string;
	number: number;
}

export interface ExtraRuns {
	byes: number;
	legbyes: number;
	wides: number;
	noballs: number;
	penalty: string;
	total: number;
}

export interface Equations {
	runs: number;
	wickets: number;
	overs: string;
	bowlers_used: number;
	runrate: string;
}

export interface CurrentPartnership {
	runs: number;
	balls: number;
	overs: number;
	batsmen: Batsmen2[];
}

export interface Batsmen2 {
	name: string;
	batsman_id: number;
	runs: number;
	balls: number;
}

export interface Team {
	tid: number;
	title: string;
	abbr: string;
	alt_name: string;
	type: string;
	thumb_url: string;
	logo_url: string;
	country: string;
	sex: string;
	scores_full: string;
	scores: string;
	overs: string;
}

export interface Player {
	pid: number;
	title: string;
	short_name: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	birthdate: string;
	birthplace: string;
	country: string;
	primary_team: any[];
	logo_url: string;
	playing_role: string;
	batting_style: string;
	bowling_style: string;
	fielding_position: string;
	recent_match: number;
	recent_appearance: number;
	fantasy_player_rating: number;
	alt_name: string;
	facebook_profile: string;
	twitter_profile: string;
	instagram_profile: string;
	debut_data: string;
	thumb_url: string;
	nationality: string;
	role: string;
	role_str: string;
}

/** Match Score Card interface */

let timeOut: any;

const path = "/matches";

const useMatchStore = create(
	combine(
		{
			match: {
				id: null as any,
				list: {} as any,
				featured_list: [] as Match[],
				detail: {} as Match,
				live: {} as MatchLive,
				scorecard: {} as MatchScoreCard,
				total: 0,
				page: 1,
				size: 10,
				search: null as string | null,
				paginate: true as boolean,
				team_generated: {},
				Player: [],
				team_generated_id: '',
				team_preview: [],
				// timeOut: null as any
			},
		},
		(set, get) => ({
			get: {
				featuredMatches: async () => {
					toast.promise(
						Api.get(path + "/featured-matches", {
							query: {},
						}),
						{
							loading: "fetching...",
							success: (res) => {
								if (res?.status) {
									set((prev) => ({
										match: {
											...prev.match,
											featured_list: res?.data,
										},
									}));
								}
								return res?.message || "fetched";
							},
							error: (err) => {
								return err;
							},
						},
					);
				},

				detail: async (id: string) => {
					toast.promise(
						Api.get(`${path}/${id}`, {
							query: {},
						}),
						{
							loading: "fetching...",
							success: (res) => {
								if (res?.status) {
									set((prev) => ({
										match: {
											...prev.match,
											detail: res?.data,
										},
									}));
								}
								return res?.message || "fetched";
							},
							error: (err) => {
								return err;
							},
						},
					);
				},

				live: async (id: string) => {
					toast.promise(
						Api.get(`${path}/${id}/live`, {
							query: {},
						}),
						{
							loading: "fetching...",
							success: (res) => {
								if (res?.status) {
									set((prev) => ({
										match: {
											...prev.match,
											live: res?.data,
										},
									}));
								}
								return res?.message || "fetched";
							},
							error: (err) => {
								return err;
							},
						},
					);
				},

				scoreCard: async (id: string) => {
					toast.promise(
						Api.get(`${path}/${id}/scorecard`, {
							query: {},
						}),
						{
							loading: "fetching...",
							success: (res) => {
								if (res?.status) {
									set((prev) => ({
										match: {
											...prev.match,
											scorecard: res?.data,
										},
									}));
								}
								return res?.message || "fetched";
							},
							error: (err) => {
								return err;
							},
						},
					);
				},

				generateTeam: async (match_id: string, series_id: string) => {
					toast.promise(
						Api.get(`${path}/${match_id}/${series_id}/generate-team`, {
							query: {},
						}),
						{
							loading: "fetching...",
							success: (res) => {
								// console.log("🚀 ~ generateTeam: ~ res:", res);
								if (res?.status) {
									set((prev) => ({
										match: {
											...prev.match,
											Player: res?.data?.team?.players,
											team_generated_id: res?.data?.teamId
										},
									}));
								}
								return res?.message || "fetched";
							},
							error: (err) => {
								return err;
							},
						},
					);
				},
				generateRedisData: async (match_id: string, redis_id: string) => {
					toast.promise(

						Api.get(`${path}/${redis_id}/series/team-data-redis`, {
							query: {
								'id': redis_id
							},
						}),
						{
							loading: "fetching...",
							success: (res) => {
								// console.log("🚀 ~ generateTeam: ~ res:", res);
								if (res?.status) {
									set((prev) => ({
										match: {
											...prev.match,
											team_preview: res?.data?.players,
											// team_generated_id: res?.data?.teamId
										},
									}));
								}
								return res?.message || "fetched";
							},
							error: (err) => {
								return err;
							},
						},
					);
				},

				list: async () => {
					const {
						match: { page, size, search, paginate, id },
					} = get();

					toast.promise(
						Api.get(path + '/' + id, {
							query: { paginate: paginate ? "YES" : "NO" },
						}),
						{
							loading: "fetching...",
							success: (res) => {
								set((prev) => ({
									match: {
										...prev.match,
										list: paginate ? res?.data : res,
										total: res?.meta?.total,
									},
								}));
								return res?.message || "fetched";
							},
							error: (err) => {
								return err;
							},
						},
					);
				},
				paginate: ({
					page,
					size,
					search,
					paginate,
					id,
				}: {
					page?: number;
					size?: number;
					search?: string;
					paginate?: boolean;
					id?: string
				}) => {
					set((prev) => ({ match: { ...prev.match, search: search || "" } }));

					clearTimeout(timeOut);

					const init = () => {
						set((prev) => ({
							match: {
								...prev.match,
								page: page || prev.match.page,
								size: size || prev.match.size,
								search: search || prev.match.search,
								id: id || prev.match.id,
								paginate: paginate ?? true,
							},
						}));
						useMatchStore.getState().get.list();
					};

					if (search) {
						timeOut = setTimeout(() => {
							init();
						}, 1000);
						set((prev) => ({ match: { ...prev.match, search: search } }));
						return;
					}
					init();
				},
			},
			select: (id: any) =>
				set((prev) => ({ match: { ...prev.match, id: id } })),
			add: async (bodyData: any) => {
				let id = get().match.id;

				toast.promise(
					id ? Api.put(`${path}/${id}`, bodyData) : Api.post(path, bodyData),
					{
						loading: id ? "Updating" : "Adding",
						success: (res) => {
							useMatchStore.getState().get.paginate({});
							return res?.message;
						},
						error: (err) => {
							return err;
						},
					},
				);
			},
			delete: async () => {
				let id = get().match.id;

				if (!id) return toast.error("No plan to delete");

				toast.promise(Api.del(`${path}/${id}`), {
					loading: "deleting",
					success: (res) => {
						useMatchStore.getState().get.paginate({});
						return res?.message;
					},
					error: (err) => {
						return err;
					},
				});
			},
		}),
	),
);

export default useMatchStore;
