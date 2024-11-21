export interface MatchScoreCard {
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
	live_inning_number: string;
	day: string;
	session: string;
	weather: Weather;
	pitch: Pitch;
	toss: Toss;
	current_over: string;
	previous_over: string;
	man_of_the_match: string;
	man_of_the_series: string;
	is_followon: number;
	team_batting_first: string;
	team_batting_second: string;
	last_five_overs: string;
	innings: Inning[];
	players: Player[];
	pre_match_odds: any[];
	day_remaining_over: string;
	match_notes: string[][];
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
	thumb_url: string;
	scores_full: string;
	scores: string;
	overs: string;
}

export interface Teamb {
	team_id: number;
	name: string;
	short_name: string;
	logo_url: string;
	thumb_url: string;
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

export interface Inning {
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
	batsmen: Batsmen[];
	bowlers: Bowler[];
	fielder: Fielder[];
	powerplay: any[];
	review: Review;
	fows: Fow[];
	last_wicket: LastWicket;
	extra_runs: ExtraRuns;
	equations: Equations;
	current_partnership: CurrentPartnership;
	did_not_bat: DidNotBat[];
	max_over: string;
	target: string;
}

export interface Batsmen {
	name: string;
	batsman_id: string;
	batting: string;
	position: string;
	role: string;
	role_str: string;
	runs: string;
	balls_faced: string;
	fours: string;
	sixes: string;
	run0: string;
	run1: string;
	run2: string;
	run3: string;
	run5: string;
	how_out: string;
	dismissal: string;
	strike_rate: string;
	bowler_id: string;
	first_fielder_id: string;
	second_fielder_id: string;
	third_fielder_id: string;
}

export interface Bowler {
	name: string;
	bowler_id: string;
	bowling: string;
	position: string;
	overs: string;
	maidens: string;
	runs_conceded: string;
	wickets: string;
	noballs: string;
	wides: string;
	econ: string;
	run0: string;
	bowledcount: string;
	lbwcount: string;
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

export interface Fow {
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

export interface DidNotBat {
	player_id: string;
	name: string;
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
