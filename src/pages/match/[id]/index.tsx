import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import { Table } from "react-bootstrap";
import { useRouter } from "next/router";
import useMatchStore from "@/services/match/match.service";

function index() {
	const router = useRouter();

	const matchStore = useMatchStore();
	const {
		match: { detail, live, scorecard },
	} = matchStore;

	const [activeTab, setActiveTab] = useState("inf");

	const { id } = router.query;

	useEffect(() => {
		if (!router.isReady) return;

		matchStore.get.detail(`${router.query.id}`);
		matchStore.get.live(`${router.query.id}`);
		matchStore.get.scoreCard(`${router.query.id}`);

		matchStore.get.paginate({ id: router.query.id as any });
	}, [router.isReady]);

	return (
		<>
			<main>
				<Header
					series_id={matchStore?.match?.detail?.competition?.cid || "10"}
					match_id={id}
				/>

				<section className='score_main_sec'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-12'>
								<div className='match_title'>
									<h3>{detail?.title}</h3>
								</div>
							</div>
						</div>
						<div className='row align-items-center score_row'>
							<div className='col-md-4 col-4 d-flex justify-content-center'>
								<div className='score_content '>
									<div className='team_img'>
										<Image
											src={detail?.teama?.logo_url}
											alt='#'
											width={60}
											height={60}
										/>
									</div>
									<div className='score ms-4'>
										<h3>{detail?.teama?.short_name}</h3>
										<h4>
											{detail?.teama?.scores}{" "}
											<span>{detail?.teama?.overs}</span>
										</h4>
									</div>
								</div>
							</div>
							<div className='col-md-4 col-4'>
								<div className='result_content'>
									<h4>{detail?.status_note}</h4>
								</div>
							</div>
							<div className='col-md-4 col-4 d-flex justify-content-center'>
								<div className='score_content'>
									<div className='score text-end'>
										<h3>{detail?.teamb?.short_name}</h3>
										<h4>
											{detail?.teamb?.scores}{" "}
											<span>{detail?.teamb?.overs}</span>
										</h4>
									</div>
									<div className='team_img ms-4'>
										<Image
											src={detail?.teamb?.logo_url}
											alt='#'
											width={60}
											height={60}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className='team_score_tabs_sec'>
					{matchStore.match.list.status && (
						<div className='container'>
							<Tabs
								defaultActiveKey={
									matchStore.match.list?.status === 2
										? "scorecard"
										: matchStore.match.list.status === 1
										? "info"
										: "live"
								}
								id='uncontrolled-tab-example'
								className='mb-3'>
								{matchStore.match.list.status === 3 && (
									<Tab.Pane eventKey='live' title='Live'>
										<div className='live_match_content'>
											<div className='comman_card'>
												<div className='content pt-0'>
													<h5>Run Needed:{live?.live_score?.target} </h5>
													<h5>Balls Rem: {live?.live_score?.overs}</h5>
												</div>
												<div className='content border-0 pb-0'>
													<h5>CRR: {live?.live_score?.runrate}</h5>
													{/* <h5>RRR: {live?.live_score?.required_runrate}</h5> */}
													<h5>Target: {live?.live_score?.target}</h5>
												</div>
											</div>
											<div className='comman_card'>
												<div className='content p-0 border-0 align-items-center'>
													<h5>Winning Probability:</h5>
													<div className='buttons'>
														<button className='btn btn-primary btn_red'>
															42
														</button>
														<button className='btn btn-primary btn_green'>
															44
														</button>
													</div>
												</div>
											</div>
											<div className='comman_card'>
												<div className='content p-0 border-0 align-items-center'>
													<h5>Run Rate: {live?.live_score?.runrate} </h5>
													<h5>Balls Rem: {live?.live_score?.overs}</h5>
												</div>
											</div>
											<div className='ads_banner mb-4'>
												<img
													src='/ads_banner.png'
													alt='#'
													className='img-fluid rounded-3'
												/>
											</div>
											<div className='comman_card'>
												<div className='content pt-0 align-items-center'>
													<div className='d-flex align-items-center'>
														<h5>45 Over Runs:</h5>
														<div className='buttons ms-4'>
															<button className='btn btn-primary btn_red'>
																165
															</button>
															<button className='btn btn-primary btn_green'>
																166
															</button>
														</div>
													</div>
													<div className='d-flex align-items-center'>
														<h5>R X D:</h5>
														<div className='buttons ms-4'>
															<button className='btn btn-primary btn_red'>
																14
															</button>
															<button className='btn btn-primary btn_green'>
																24
															</button>
														</div>
													</div>
												</div>
												<div className='content pb-0 align-items-center border-0'>
													<div>
														<h5>1st Inning’s Total Runs:</h5>
													</div>
													<div className='buttons'>
														<button className='btn btn-primary btn_red'>
															342
														</button>
														<button className='btn btn-primary btn_green'>
															345
														</button>
													</div>
												</div>
											</div>
											<div className='comman_card'>
												<div className='batter_heading'>
													<div className='batter_div'>
														<h5>Batter</h5>
													</div>
													<div className='batter_div r_boll'>
														<h5>R</h5>
														<h5>B</h5>
														<h5>4s</h5>
														<h5>6s</h5>
														<h5>SR</h5>
													</div>
												</div>
												{live?.batsmen?.length ? (
													live?.batsmen?.map((item) => {
														return (
															<div className='batter_heading batsman_runs pt-3'>
																<div className='batter_div'>
																	<h5>
																		{item?.name}
																		{/* 🏏 */}
																	</h5>
																</div>
																<div className='batter_div r_boll'>
																	<h5>{item?.runs}</h5>
																	<h5>{item?.balls_faced}</h5>
																	<h5>{item?.fours}</h5>
																	<h5>{item?.sixes}</h5>
																	<h5>{item?.strike_rate}</h5>
																</div>
															</div>
														);
													})
												) : (
													<></>
												)}

												<div className='batter_heading batsman_runs result_border pt-3'>
													<div className='batter_div'>
														<h5>
															P’ship{" "}
															{live?.live_inning?.current_partnership?.runs}(
															{live?.live_inning?.current_partnership?.balls})
														</h5>
													</div>
													<div className='batter_div r_boll'>
														<h5>
															L ‘ Wkt:{live?.live_inning?.last_wicket?.name}{" "}
															{live?.live_inning?.last_wicket?.runs}(
															{live?.live_inning?.last_wicket?.balls})
														</h5>
													</div>
												</div>
											</div>
											<div className='comman_card'>
												<div className='batter_heading'>
													<div className='batter_div'>
														<h5>Bowler</h5>
													</div>
													<div className='batter_div r_boll'>
														<h5>O</h5>
														<h5>R</h5>
														<h5>Wkt</h5>
														<h5>Eco</h5>
													</div>
												</div>
												{live?.bowlers?.map((item) => {
													return (
														<div className='batter_heading batsman_runs pt-3'>
															<div className='batter_div'>
																<h5>
																	{item?.name}
																	{/* 🔴 */}
																</h5>
															</div>
															<div className='batter_div r_boll'>
																<h5>{item?.overs}</h5>
																<h5>{item?.runs_conceded}</h5>
																<h5>{item?.wickets}</h5>
																<h5>{item?.econ}</h5>
															</div>
														</div>
													);
												})}
											</div>
											<div className='ads_banner mb-4'>
												<img
													src='/ads_banner.png'
													alt='#'
													className='img-fluid rounded-3'
												/>
											</div>
											<div className='comman_card'>
												<div className='batter_heading'>
													<div className='batter_div'>
														<h5>Did not bat</h5>
													</div>
												</div>
												<div className='batter_heading batsman_runs pt-3'>
													<div className='batter_div'>
														<h5>
															{live?.live_inning?.did_not_bat?.length ? (
																live?.live_inning?.did_not_bat?.map(
																	(item) => item?.name,
																)
															) : (
																<></>
															)}
														</h5>
													</div>
												</div>
											</div>
											<div className='comman_card score_main_sli'>
												<div className='batter_heading'>
													<div className='batter_div'>
														<h5>Last 24 Balls</h5>
													</div>
												</div>
												<div
													className='batter_heading score_balls border-0 pt-3'
													style={{ overflowX: "scroll" }}>
													{/* {live?.live_inning?.recent_scores} */}
													<div className='batter_div'>
														<div className='over_list'>
															{/* {
														live?.live_inning.recent_scores.split(',').map((recent: any) => {
															return (
																<>
																	{recent == 4 ? <h5 className='comman_run six_four'>4</h5> :
																		recent == 6 ? <h5 className='comman_run six_run'>6</h5> :
																			recent == 'w' ? <h5 className='comman_run '>6</h5> :

													}
																</>
															)
														})
													} */}

															{live?.commentaries?.length > 0 &&
																live?.commentaries?.map((recent: any) => {
																	return (
																		<>
																			{recent?.event == "ball" ? (
																				recent?.six ? (
																					<h5 className='comman_run six_run'>
																						6
																					</h5>
																				) : recent?.four ? (
																					<h5 className='comman_run six_four'>
																						4
																					</h5>
																				) : (
																					<h5 className='comman_run single_run'>
																						{recent?.run}
																					</h5>
																				)
																			) : (
																				recent?.event == "overend" && (
																					<h5
																						className='run_count'
																						style={{
																							display: "flex",
																							gap: "10px",
																						}}>
																						{" "}
																						<span>=</span> {recent?.runs}
																					</h5>
																				)
																			)}
																		</>
																	);
																})}
														</div>
													</div>
												</div>
											</div>
											<div className='comman_card'>
												<div className='batter_heading'>
													<div className='batter_div'>
														<h5>Run Rate</h5>
													</div>
													<div className='batter_div r_boll'>
														<h5>8.45*</h5>
														<h5>9</h5>
														<h5>10</h5>
														<h5>11</h5>
													</div>
												</div>
												<div className='batter_heading batsman_runs pt-3'>
													<div className='batter_div'>
														<h5>Projected Score</h5>
													</div>
													<div className='batter_div r_boll'>
														<h5>164</h5>
														<h5>171</h5>
														<h5>179</h5>
														<h5>15.34</h5>
													</div>
												</div>
											</div>
										</div>
									</Tab.Pane>
								)}
								<Tab.Pane eventKey='info' title='Info'>
									<div className='info_tab_content'>
										<div className='comman_card'>
											<div className='team_run_ned'>
												<div className='image'>
													<img
														src='/match_dp.png'
														alt='#'
														className='img-fluid'
													/>
												</div>
												<div className='content'>
													<p>Run Needed: 0</p>
													<h5>{detail?.title} </h5>
													<h6>{detail?.competition?.title}</h6>
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-md-6'>
												<div className='comman_card'>
													<div className='addrss_main'>
														<h5>
															<svg
																width='26'
																height='26'
																viewBox='0 0 26 26'
																fill='none'>
																<path
																	d='M22.1 2.6H19.5V1.3C19.5 0.955218 19.363 0.624558 19.1192 0.380761C18.8754 0.136964 18.5448 0 18.2 0C17.8552 0 17.5246 0.136964 17.2808 0.380761C17.037 0.624558 16.9 0.955218 16.9 1.3V2.6H9.1V1.3C9.1 0.955218 8.96304 0.624558 8.71924 0.380761C8.47544 0.136964 8.14478 0 7.8 0C7.45522 0 7.12456 0.136964 6.88076 0.380761C6.63696 0.624558 6.5 0.955218 6.5 1.3V2.6H3.9C2.86566 2.6 1.87368 3.01089 1.14228 3.74228C0.410892 4.47368 0 5.46566 0 6.5V22.1C0 23.1343 0.410892 24.1263 1.14228 24.8577C1.87368 25.5891 2.86566 26 3.9 26H22.1C23.1343 26 24.1263 25.5891 24.8577 24.8577C25.5891 24.1263 26 23.1343 26 22.1V6.5C26 5.46566 25.5891 4.47368 24.8577 3.74228C24.1263 3.01089 23.1343 2.6 22.1 2.6ZM23.4 22.1C23.4 22.4448 23.263 22.7754 23.0192 23.0192C22.7754 23.263 22.4448 23.4 22.1 23.4H3.9C3.55522 23.4 3.22456 23.263 2.98076 23.0192C2.73696 22.7754 2.6 22.4448 2.6 22.1V13H23.4V22.1ZM23.4 10.4H2.6V6.5C2.6 6.15522 2.73696 5.82456 2.98076 5.58076C3.22456 5.33696 3.55522 5.2 3.9 5.2H6.5V6.5C6.5 6.84478 6.63696 7.17544 6.88076 7.41924C7.12456 7.66304 7.45522 7.8 7.8 7.8C8.14478 7.8 8.47544 7.66304 8.71924 7.41924C8.96304 7.17544 9.1 6.84478 9.1 6.5V5.2H16.9V6.5C16.9 6.84478 17.037 7.17544 17.2808 7.41924C17.5246 7.66304 17.8552 7.8 18.2 7.8C18.5448 7.8 18.8754 7.66304 19.1192 7.41924C19.363 7.17544 19.5 6.84478 19.5 6.5V5.2H22.1C22.4448 5.2 22.7754 5.33696 23.0192 5.58076C23.263 5.82456 23.4 6.15522 23.4 6.5V10.4Z'
																	fill='#979494'
																/>
															</svg>
															{detail?.date_start_ist}
														</h5>
														<h5>
															<svg
																width='26'
																height='37'
																viewBox='0 0 26 37'
																fill='none'>
																<path
																	d='M23.5308 23.1927C23.06 23.1927 21.4206 23.1927 19.0325 23.1927C17.1119 23.1927 16.7437 22.8697 16.7437 22.3526C16.7437 21.7617 17.7039 20.7286 17.9244 20.3592C18.1471 19.9899 19.5495 18.7352 19.8451 16.8885C20.1406 15.0429 17.9244 13.7132 17.1869 14.97C16.7492 15.7154 15.6367 17.9226 14.3082 18.8818C11.8407 20.6635 9.80218 24.54 7.23438 24.54V32.8949C9.35009 32.8949 14.1461 35.2477 15.8451 35.5895C17.769 35.9732 20.2827 36.8243 21.6168 35.0118C22.4392 33.8949 23.7281 30.8861 24.695 27.81C27.1494 25.4529 25.4548 23.1927 23.5308 23.1927Z'
																	fill='#979494'
																/>
																<path
																	d='M20.0027 7.50592H19.4746V11.83H20.0027V7.50592Z'
																	fill='#979494'
																/>
																<path
																	d='M21.1544 13.2347L21.6836 13.2325L21.6659 8.90955L21.1367 8.9106L21.1544 13.2347Z'
																	fill='#979494'
																/>
																<path
																	d='M0 26.7186V33.8079C0 34.8487 0.843422 35.691 1.8842 35.691H4.13116C4.82464 35.691 5.38695 35.1299 5.38695 34.4364V24.8356H1.8842C0.843422 24.8356 0 25.6779 0 26.7186Z'
																	fill='#979494'
																/>
																<path
																	d='M20.3474 3.82577C20.365 3.85668 20.3849 3.8897 20.4048 3.92061C20.4257 3.95151 20.4467 3.98348 20.4687 4.01431C20.4918 4.04522 20.5161 4.07606 20.5393 4.10583C20.5635 4.13561 20.5889 4.16645 20.6143 4.19622L20.654 4.24251L21.1446 4.12785L21.0608 4.04628C21.0354 4.01982 21.0122 3.99554 20.988 3.9669C20.9638 3.94262 20.9417 3.9151 20.9218 3.88752C20.8987 3.85887 20.8789 3.83241 20.8601 3.80369C20.8413 3.77497 20.8237 3.74745 20.8072 3.71767C20.7586 3.63385 20.7201 3.55009 20.6936 3.4652C20.6672 3.38138 20.6507 3.29875 20.6484 3.22043C20.644 3.14105 20.6495 3.06498 20.6672 2.99329C20.6848 2.92273 20.7146 2.85654 20.7543 2.7948L21.3232 3.78485L21.7146 3.78153L21.0178 2.57098L21.052 2.55553L21.0872 2.54339L21.1247 2.53238L21.16 2.52137L21.1754 2.51806L21.1909 2.51587L21.2052 2.51368L21.2229 2.5115L21.9516 3.77942L22.3419 3.77497L21.6263 2.53132C21.7278 2.55447 21.827 2.59088 21.9251 2.63829C22.0232 2.68571 22.1169 2.74301 22.2051 2.80807C22.2933 2.87312 22.376 2.94806 22.451 3.0297C22.5237 3.11353 22.5888 3.19947 22.6428 3.29318C22.6627 3.32627 22.6781 3.35823 22.6936 3.3902C22.7101 3.42435 22.7233 3.45526 22.7355 3.48941C22.7487 3.5225 22.7586 3.55559 22.7686 3.58756C22.7752 3.62284 22.784 3.65593 22.7884 3.68903L22.8027 3.77059L23.3198 3.76396L23.3065 3.7066C23.2977 3.66362 23.2856 3.62058 23.2724 3.57648C23.2592 3.53238 23.2426 3.48941 23.2261 3.44636C23.2096 3.40226 23.1908 3.35929 23.1687 3.31625C23.1478 3.27215 23.1258 3.22918 23.1015 3.18726C23.0078 3.02631 22.8931 2.87524 22.7619 2.73962C22.6318 2.604 22.4863 2.48052 22.3286 2.37686C22.1731 2.27321 22.0066 2.18832 21.8358 2.12545C21.667 2.06153 21.494 2.02074 21.3231 2.00635L21.1621 1.72629L20.8159 1.80567L20.9394 2.01954L20.924 2.02173L20.9074 2.02505L20.8931 2.02836L20.8788 2.03055L20.8424 2.04156L20.806 2.05151L20.7707 2.06364L20.7321 2.07691L20.6064 1.85422L20.258 1.93247L20.4388 2.24668C20.3374 2.33269 20.2591 2.43409 20.2051 2.55207C20.15 2.66786 20.118 2.7979 20.1102 2.93465C20.1003 3.07359 20.1169 3.22022 20.1565 3.36903C20.1963 3.51926 20.2592 3.67251 20.3474 3.82577Z'
																	fill='#979494'
																/>
																<path
																	d='M19.1883 6.18627C20.163 7.03519 21.3471 7.54126 22.3559 7.54126C23.0351 7.54126 23.5864 7.31962 23.9535 6.89957L24.7583 5.97677C25.6966 4.89852 25.088 2.82578 23.4011 1.35612C22.4275 0.507125 21.2434 0 20.2336 0C19.5544 0 19.0021 0.222692 18.6371 0.641686L17.8323 1.56449C16.8929 2.64274 17.5015 4.71661 19.1883 6.18627ZM19.1751 1.11021C19.4033 0.847796 19.7683 0.70999 20.2292 0.70999C21.0583 0.70999 22.0936 1.16314 22.9315 1.89189C23.5985 2.47403 24.1002 3.18077 24.3427 3.88307C24.5809 4.56667 24.5368 5.14323 24.2192 5.50711C23.991 5.77059 23.6261 5.90847 23.1641 5.90847C22.3362 5.90847 21.3009 5.45532 20.464 4.72543C19.0968 3.53245 18.507 1.87651 19.1751 1.11021Z'
																	fill='#979494'
																/>
															</svg>
															{live?.status_note}
														</h5>
														<h5 className='border-0 pb-0'>
															<svg
																width='20'
																height='28'
																viewBox='0 0 20 28'
																fill='none'>
																<path
																	d='M10 13.3C9.0528 13.3 8.14439 12.9313 7.47462 12.2749C6.80485 11.6185 6.42857 10.7283 6.42857 9.8C6.42857 8.87174 6.80485 7.9815 7.47462 7.32513C8.14439 6.66875 9.0528 6.3 10 6.3C10.9472 6.3 11.8556 6.66875 12.5254 7.32513C13.1952 7.9815 13.5714 8.87174 13.5714 9.8C13.5714 10.2596 13.4791 10.7148 13.2996 11.1394C13.1201 11.564 12.857 11.9499 12.5254 12.2749C12.1937 12.5999 11.8 12.8577 11.3667 13.0336C10.9334 13.2095 10.469 13.3 10 13.3ZM10 0C7.34784 0 4.8043 1.0325 2.92893 2.87035C1.05357 4.70821 0 7.20088 0 9.8C0 17.15 10 28 10 28C10 28 20 17.15 20 9.8C20 7.20088 18.9464 4.70821 17.0711 2.87035C15.1957 1.0325 12.6522 0 10 0Z'
																	fill='#979494'
																/>
															</svg>
															{detail?.venue?.location}
														</h5>
													</div>
												</div>
											</div>
											<div className='col-md-6'>
												<div className='comman_card'>
													<div className='addrss_main team_squad'>
														<h5 className='text-black'>Team Squads</h5>
														<div>
															<h5 className='d-flex justify-content-between'>
																{detail?.teama?.name}
																<svg
																	className='m-0'
																	width='11'
																	height='18'
																	viewBox='0 0 11 18'
																	fill='none'>
																	<path
																		d='M0.420639 17.6195C0.151304 17.3758 -1.61071e-09 17.0453 -1.61072e-09 16.7007C-1.61071e-09 16.3562 0.151304 16.0257 0.420639 15.782L7.53218 9.3493L0.420639 2.91662C0.158937 2.67152 0.0141285 2.34326 0.0174019 2.00252C0.0206752 1.66179 0.171768 1.33585 0.438139 1.09491C0.70451 0.853964 1.06485 0.717295 1.44154 0.714334C1.81823 0.711373 2.18114 0.842358 2.4521 1.07908L10.5794 8.43053C10.8487 8.67423 11 9.00471 11 9.3493C11 9.69389 10.8487 10.0244 10.5794 10.2681L2.4521 17.6195C2.18268 17.8631 1.81732 18 1.43637 18C1.05541 18 0.690055 17.8631 0.420639 17.6195Z'
																		fill='#414141'
																	/>
																</svg>
															</h5>
															<h5 className='d-flex justify-content-between border-0 pb-0'>
																{detail?.teamb?.name}
																<svg
																	className='m-0'
																	width='11'
																	height='18'
																	viewBox='0 0 11 18'
																	fill='none'>
																	<path
																		d='M0.420639 17.6195C0.151304 17.3758 -1.61071e-09 17.0453 -1.61072e-09 16.7007C-1.61071e-09 16.3562 0.151304 16.0257 0.420639 15.782L7.53218 9.3493L0.420639 2.91662C0.158937 2.67152 0.0141285 2.34326 0.0174019 2.00252C0.0206752 1.66179 0.171768 1.33585 0.438139 1.09491C0.70451 0.853964 1.06485 0.717295 1.44154 0.714334C1.81823 0.711373 2.18114 0.842358 2.4521 1.07908L10.5794 8.43053C10.8487 8.67423 11 9.00471 11 9.3493C11 9.69389 10.8487 10.0244 10.5794 10.2681L2.4521 17.6195C2.18268 17.8631 1.81732 18 1.43637 18C1.05541 18 0.690055 17.8631 0.420639 17.6195Z'
																		fill='#414141'
																	/>
																</svg>
															</h5>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='ads_banner mb-4'>
											<img
												src='/ads_banner.png'
												alt='#'
												className='img-fluid rounded-3'
											/>
										</div>
										<div className='common_card'></div>
										<div className='ads_banner mb-4'>
											<img
												src='/ads_banner.png'
												alt='#'
												className='img-fluid rounded-3'
											/>
										</div>
										<div className='did_not_bat_main'>
											<div className='comman_card'>
												<div className='content'>
													<h5>Umpires</h5>
												</div>
												<div className='umpirs_main'>
													<div className='umpire'>
														<div className='icon'>
															<svg
																width='46'
																height='48'
																viewBox='0 0 46 48'
																fill='none'>
																<path
																	d='M32.0778 17.9015L31.6197 14.6036C28.5467 13.2835 25.583 12.7412 22.7127 12.8013C19.8594 12.8622 17.0871 13.5228 14.3846 14.6111L13.9264 17.8949C16.3311 16.5936 19.6605 15.9396 22.9842 15.9396C26.306 15.9396 29.6467 16.5927 32.0778 17.9015ZM23.0012 5.89586C24.219 5.89586 25.2069 6.87912 25.2069 8.09132C25.2069 9.30446 24.219 10.2877 23.0012 10.2877C21.7823 10.2877 20.7954 9.30446 20.7954 8.09132C20.7954 6.87912 21.7823 5.89586 23.0012 5.89586ZM23.2434 0C23.9353 0 24.5018 0.563878 24.5018 1.25348V1.67756C26.6048 1.97967 28.5109 2.94793 29.9578 4.35903C31.6715 6.03096 32.7442 8.324 32.7442 10.8741L32.6594 14.1589L33.4879 20.1307L33.1778 19.9131C33.1005 20.2443 33.0025 20.5529 32.9026 20.8053L32.8997 20.8156C32.699 21.3242 32.4313 21.7867 32.1202 22.1273C31.86 22.405 31.5669 22.6039 31.2492 22.6818C31.1879 22.8779 31.1201 23.0805 31.071 23.2794C30.7166 24.4672 30.4385 25.4017 29.7023 26.3296C29.5421 26.5323 29.3705 26.7274 29.1877 26.9132C29.0623 27.0446 28.9341 27.1693 28.8021 27.2866C28.8181 27.4546 28.821 28.5992 28.8191 29.4033C28.8945 29.4633 28.9529 29.5421 28.9878 29.6322C29.6439 29.7448 30.1868 29.8321 30.726 29.9184C35.0621 30.6145 39.2408 31.2854 41.8595 34.3318C42.4043 34.9651 42.5146 35.1303 42.918 35.8546C43.4761 36.8529 43.9116 38.0397 44.2 39.4583L45.991 47.3582C46.004 47.4283 46.0029 47.5002 45.9879 47.5698C45.973 47.6395 45.9443 47.7055 45.9037 47.7641C45.8631 47.8228 45.8113 47.8729 45.7512 47.9116C45.6912 47.9503 45.624 47.9768 45.5536 47.9897C45.5206 47.9953 45.4877 47.9981 45.4556 47.9981L0.546727 48C0.245084 48 0 47.7561 0 47.4558C0 47.4117 0.00565579 47.3686 0.0150821 47.3273L1.34231 41.028C3.12483 32.0003 7.77671 31.0987 14.6259 29.7711C15.4167 29.6181 16.2368 29.4586 17.0466 29.2888C17.0946 29.2785 17.1427 29.2757 17.1889 29.2785V27.297L17.1936 27.0324C16.5159 26.4216 15.9588 25.6091 15.5855 24.7834C15.3244 24.2073 15.117 23.5853 14.8776 22.8807L14.7531 22.5148C14.4807 22.4791 14.2271 22.3543 13.999 22.1695C13.7134 21.9359 13.4664 21.5944 13.2666 21.1994C13.1111 20.8935 12.9414 20.431 12.8236 19.9196L12.5116 20.141L13.3448 14.1739L13.1582 11.2738C13.1459 11.0796 13.1393 10.8957 13.1393 10.7259C13.1393 8.26583 14.2045 6.05629 15.8881 4.42377C17.4868 2.87475 19.6473 1.84644 21.9841 1.62127V1.25348C21.9841 0.563878 22.5506 0 23.2434 0ZM31.5885 13.443L31.6498 11.0862L31.6508 10.8741C31.6508 8.62799 30.7044 6.60704 29.1933 5.13307C27.6757 3.65348 25.5906 2.72181 23.3217 2.66364L22.9484 2.66271C22.7467 2.66271 22.5562 2.66833 22.3781 2.67959C20.1818 2.81845 18.14 3.75669 16.6488 5.2025C15.1688 6.63706 14.2328 8.57357 14.2328 10.7259C14.2328 10.8957 14.2385 11.0561 14.2479 11.2063L14.3931 13.4693C17.0777 12.4316 19.8386 11.8058 22.692 11.7457C25.568 11.6848 28.5288 12.198 31.5885 13.443ZM13.7379 19.2741C13.8567 19.8296 14.0839 20.4075 14.2347 20.7124C14.3704 20.9789 14.5241 21.1994 14.6853 21.3307C14.9775 21.5625 15.0746 21.3026 15.3885 21.4696C15.6571 21.6159 15.7174 21.9744 15.8098 22.2408L15.9211 22.5683C16.135 23.2081 16.3311 23.7776 16.5602 24.2927C17.0352 25.3492 17.6715 26.1026 18.5896 26.7997C21.3327 28.8732 24.9637 28.9614 27.6908 26.8063C28.1168 26.4722 28.5061 26.0923 28.8483 25.6579C29.149 25.2844 29.363 24.8866 29.5383 24.4494C29.7202 24.0009 29.8664 23.5177 30.0275 22.9736C30.1199 22.6611 30.2132 22.3478 30.3132 22.0344C30.4668 21.4414 30.9315 21.8393 31.335 21.3983C31.5386 21.1675 31.7309 20.8119 31.8883 20.4141C31.9496 20.2574 32.1485 19.7733 32.2767 19.2854C30.0002 17.7786 26.4955 17.0289 22.9842 17.0289C19.471 17.0289 15.9804 17.7795 13.7379 19.2741ZM18.2296 29.7232L18.2343 29.7542C18.3596 30.7956 19.0308 31.58 19.9631 32.096C20.753 32.5332 22.2914 32.8391 23.0945 32.8428C23.6883 32.8447 24.2822 32.7781 24.8421 32.6411C24.8732 32.6308 24.9053 32.6233 24.9373 32.6167C25.1739 32.5557 25.4039 32.4807 25.6245 32.3944C26.6972 31.9712 27.5475 31.2422 27.8444 30.2036V28.0513C24.9468 29.8602 22.1198 29.9916 19.0393 28.4031C18.7461 28.2493 18.4539 28.0832 18.157 27.8946L18.2296 29.7232ZM42.6928 46.7531C42.6928 46.8066 42.689 46.86 42.6824 46.9116H44.8005L43.1301 39.6629C43.0123 39.084 42.8653 38.5482 42.6928 38.05V46.7531ZM40.8914 46.9116C40.8848 46.86 40.881 46.8066 40.881 46.7531V35.6848C40.881 35.1068 40.8791 35.3873 40.7858 34.8291C40.766 34.7109 40.619 34.6555 40.5332 34.5729C39.9318 33.9903 39.254 33.5137 38.5178 33.1187V46.7531C38.5178 46.8066 38.5141 46.86 38.5075 46.9116H40.8914ZM36.7174 46.9116C36.7099 46.86 36.7061 46.8066 36.7061 46.7531V32.5792C36.7061 32.4976 36.7146 32.4178 36.7306 32.3409C35.9708 32.0735 35.1705 31.8586 34.3439 31.6738V46.7531C34.3439 46.8066 34.3401 46.86 34.3325 46.9116H36.7174ZM32.5425 46.9116C32.5359 46.86 32.5312 46.8066 32.5312 46.7531V31.6025C32.5312 31.5059 32.5434 31.412 32.5661 31.3238C31.9034 31.2066 31.2313 31.0987 30.5545 30.9898L30.1689 30.9279V46.7531C30.1689 46.8066 30.1652 46.86 30.1576 46.9116H32.5425ZM28.3676 46.9116C28.361 46.86 28.3572 46.8066 28.3572 46.7531V31.6532C27.8124 32.4441 26.9885 33.0267 26.0261 33.4058L25.9761 33.4255C25.9884 33.4902 25.994 33.5587 25.994 33.6272V46.7531C25.994 46.8066 25.9903 46.86 25.9837 46.9116H28.3676ZM24.1936 46.9116C24.1861 46.86 24.1823 46.8066 24.1823 46.7531V33.8627C23.8222 33.9068 23.4565 33.9284 23.0907 33.9265C22.6646 33.9246 22.2376 33.8918 21.8191 33.8271V46.7531C21.8191 46.8066 21.8153 46.86 21.8087 46.9116H24.1936ZM20.0187 46.9116C20.0111 46.86 20.0074 46.8066 20.0074 46.7531V33.4705C20.0074 33.4217 20.0111 33.3739 20.0168 33.326C19.0044 32.8982 18.157 32.2452 17.6451 31.3689V46.7531C17.6451 46.8066 17.6414 46.86 17.6338 46.9116H20.0187ZM15.8438 46.9116C15.8372 46.86 15.8334 46.8066 15.8334 46.7531V30.6427C15.4912 30.7102 15.1585 30.775 14.8304 30.8378C14.3393 30.9335 13.8595 31.0255 13.3929 31.1203C13.4429 31.2469 13.4702 31.3867 13.4702 31.534V46.7531C13.4702 46.8066 13.4664 46.86 13.4589 46.9116H15.8438ZM11.6698 46.9116C11.6622 46.86 11.6585 46.8066 11.6585 46.7531V31.534L11.6594 31.4955C10.7969 31.6991 9.98436 31.9262 9.22554 32.203C9.27079 32.3249 9.2953 32.4591 9.2953 32.5998V46.7531C9.2953 46.8066 9.29152 46.86 9.28493 46.9116H11.6698ZM7.49487 46.9116C7.48733 46.86 7.48356 46.8066 7.48356 46.7531V32.9883C6.68609 33.4339 5.96309 33.9809 5.3221 34.6752C5.23821 34.7662 5.0723 34.922 5.07419 34.9557L5.12132 35.848V46.7531C5.12132 46.8066 5.11755 46.86 5.11001 46.9116H7.49487ZM3.31995 46.9116C3.31335 46.86 3.30864 46.8066 3.30864 46.7531V38.0388C2.95327 38.9601 2.65351 40.0175 2.41314 41.2363L1.18866 46.9116H3.31995Z'
																	fill='#717171'
																/>
															</svg>
														</div>
														<div className='name'>
															<p>
																Umpires :{" "}
																<span className='text-black'>
																	{detail?.umpires}
																</span>
															</p>
															<p>
																3rd Umpire :{" "}
																<span className='text-black'>
																	{detail?.referee}
																</span>
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='did_not_bat_main'>
											<div className='comman_card'>
												<div className='content'>
													<h5>Venue Guide</h5>
												</div>
												<div className='umpirs_main'>
													<div className='umpire'>
														<div className='name m-0'>
															<p>
																Stadium{" "}
																<span className='text-black'>
																	{detail?.venue?.name}
																</span>
															</p>
															<p>
																City{" "}
																<span className='text-black'>
																	{detail?.venue?.location}
																</span>
															</p>
															<p>
																Country{" "}
																<span className='text-black'>
																	{detail?.venue?.country}
																</span>
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Tab.Pane>
								{(matchStore.match.list.status === 2 ||
									matchStore.match.list.status === 3) && (
									<Tab.Pane eventKey='scorecard' title='Scorecard'>
										<div className='scorecars_tabs_main'>
											<Accordion defaultActiveKey='0'>
												{scorecard?.innings?.length ? (
													scorecard?.innings?.map((inning: any, index) => {
														return (
															<Accordion.Item eventKey={`${index}`}>
																<Accordion.Header>
																	<div className='team_main'>
																		<div className='team_img'>
																			<img
																				src={
																					inning?.batting_team_id ===
																					detail?.teama?.team_id
																						? detail?.teama?.logo_url
																						: detail?.teamb?.logo_url
																				}
																				alt='#'
																				className='img-fluid'
																			/>
																			<h5>{inning?.name}</h5>
																		</div>
																		<h6>{inning?.scores_full}</h6>
																	</div>
																</Accordion.Header>
																<Accordion.Body>
																	<div className='scorecard_cards_count'>
																		<Table>
																			<thead>
																				<tr>
																					<th style={{ width: "72%" }}>
																						Batter
																					</th>
																					<th>R</th>
																					<th>B</th>
																					<th>4s</th>
																					<th>6s</th>
																					<th>SR</th>
																				</tr>
																			</thead>
																			<tbody>
																				{inning?.batsmen?.length ? (
																					inning?.batsmen?.map(
																						(batsmen: any) => {
																							return (
																								<tr>
																									<td>
																										{batsmen?.name}
																										<br />
																										<p>{batsmen?.how_out}</p>
																									</td>
																									<td>{batsmen?.runs}</td>
																									<td>
																										{batsmen?.balls_faced}
																									</td>
																									<td>{batsmen?.fours}</td>
																									<td>{batsmen?.sixes}</td>
																									<td>
																										{batsmen?.strike_rate}
																									</td>
																								</tr>
																							);
																						},
																					)
																				) : (
																					<></>
																				)}

																				<tr>
																					<td className='border-0'>Extras:</td>
																					<td className='border-0'>
																						{inning?.extra_runs?.total}
																						<p>
																							({inning?.extra_runs?.byes}b,
																							{inning?.extra_runs?.legbyes} lb,
																							{inning?.extra_runs?.wides}wd
																							{inning?.extra_runs?.noballs}nb
																							{inning?.extra_runs?.penalty}p)
																						</p>
																					</td>
																				</tr>
																			</tbody>
																		</Table>
																		<Table>
																			<thead>
																				<tr>
																					<th style={{ width: "72%" }}>
																						Bowler
																					</th>
																					<th>O</th>
																					<th>M</th>
																					<th>R</th>
																					<th>W</th>
																					<th>ER</th>
																				</tr>
																			</thead>
																			<tbody>
																				{inning?.bowlers?.length ? (
																					inning?.bowlers?.map(
																						(bowler: any) => {
																							return (
																								<tr>
																									<td>{bowler?.name}</td>
																									<td>{bowler?.overs}</td>
																									<td>{bowler?.maidens}</td>
																									<td>
																										{bowler?.runs_conceded}
																									</td>
																									<td>{bowler?.wickets}</td>
																									<td>{bowler?.econ}</td>
																								</tr>
																							);
																						},
																					)
																				) : (
																					<></>
																				)}

																				<tr>
																					<td className='border-0'>Extras:</td>
																					<td className='border-0'>
																						{inning?.extra_runs?.total}
																						<p>
																							({inning?.extra_runs?.byes}b,
																							{inning?.extra_runs?.legbyes} lb,
																							{inning?.extra_runs?.wides}wd
																							{inning?.extra_runs?.noballs}nb
																							{inning?.extra_runs?.penalty}p)
																						</p>
																					</td>
																				</tr>
																			</tbody>
																		</Table>
																		<Table>
																			<thead>
																				<tr>
																					<th style={{ width: "72%" }}>
																						Fall of Wickets
																					</th>
																					<th>Score</th>
																					<th>Over</th>
																				</tr>
																			</thead>
																			<tbody>
																				{inning?.fows?.length ? (
																					inning?.fows?.map((fow: any) => {
																						return (
																							<tr>
																								<td>{fow?.name}</td>
																								<td>
																									{fow?.score_at_dismissal}
																								</td>
																								<td>
																									{fow?.overs_at_dismissal}
																								</td>
																							</tr>
																						);
																					})
																				) : (
																					<></>
																				)}
																			</tbody>
																		</Table>
																	</div>
																</Accordion.Body>
															</Accordion.Item>
														);
													})
												) : (
													<></>
												)}
											</Accordion>
										</div>
									</Tab.Pane>
								)}
							</Tabs>
						</div>
					)}
				</section>

				<Footer />
			</main>
		</>
	);
}

export default index;

{
	/* <div className='recent_matchs_main'>
	<div className='heading'><div className='comman_card'>
		<h5>
			Recent Performance <span>(Last 5 Matches)</span>
		</h5>
	</div>
	<Accordion defaultActiveKey='0'>
		<Accordion.Item eventKey='0'>
			<Accordion.Header>
				<div className='d-flex justify-content-between align-items-center w-100'>
					<div className='team_name'>
						<h4>Karachi Kings </h4>
					</div>
					<div className='runs_balls'>
						<h5 className='star_run'>*</h5>
						<h5 className='star_run'>*</h5>
						<h5 className='star_l'>L</h5>
						<h5 className='star_l'>L</h5>
						<h5 className='star_w'>w</h5>
						<h5 className='star_w'>w</h5>
					</div>
				</div>
			</Accordion.Header>
			<Accordion.Body>
				<div className='recent_match_card'>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
							<div className='content'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
						</div>
						<h4>Karachi</h4>
					</div>
					<div className='won_text text-center'>
						<svg
							width='24'
							height='40'
							viewBox='0 0 24 40'
							fill='none'>
							<path
								d='M15 18L12.9 15.825L18.225 10.5H0V7.5H18.225L12.9 2.175L15 0L24 9L15 18Z'
								fill='black'
							/>
							<path
								d='M9 40L11.1 37.825L5.775 32.5H24V29.5H5.775L11.1 24.175L9 22L0 31L9 40Z'
								fill='black'
							/>
						</svg>
						<p>Multan Sultans won by 20 runs</p>
					</div>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='content me-3 text-end'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
						</div>
						<h4 className='text-end'>Multan</h4>
					</div>
				</div>
				<div className='recent_match_card'>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
							<div className='content'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
						</div>
						<h4>Karachi</h4>
					</div>
					<div className='won_text text-center'>
						<svg
							width='24'
							height='40'
							viewBox='0 0 24 40'
							fill='none'>
							<path
								d='M15 18L12.9 15.825L18.225 10.5H0V7.5H18.225L12.9 2.175L15 0L24 9L15 18Z'
								fill='black'
							/>
							<path
								d='M9 40L11.1 37.825L5.775 32.5H24V29.5H5.775L11.1 24.175L9 22L0 31L9 40Z'
								fill='black'
							/>
						</svg>
						<p>Multan Sultans won by 20 runs</p>
					</div>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='content me-3 text-end'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
						</div>
						<h4 className='text-end'>Multan</h4>
					</div>
				</div>
				<div className='recent_match_card'>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
							<div className='content'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
						</div>
						<h4>Karachi</h4>
					</div>
					<div className='won_text text-center'>
						<svg
							width='24'
							height='40'
							viewBox='0 0 24 40'
							fill='none'>
							<path
								d='M15 18L12.9 15.825L18.225 10.5H0V7.5H18.225L12.9 2.175L15 0L24 9L15 18Z'
								fill='black'
							/>
							<path
								d='M9 40L11.1 37.825L5.775 32.5H24V29.5H5.775L11.1 24.175L9 22L0 31L9 40Z'
								fill='black'
							/>
						</svg>
						<p>Multan Sultans won by 20 runs</p>
					</div>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='content me-3 text-end'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
						</div>
						<h4 className='text-end'>Multan</h4>
					</div>
				</div>
			</Accordion.Body>
		</Accordion.Item>
		<Accordion.Item eventKey='1'>
			<Accordion.Header>
				<div className='d-flex justify-content-between align-items-center w-100'>
					<div className='team_name'>
						<h4>Karachi Kings </h4>
					</div>
					<div className='runs_balls'>
						<h5 className='star_run'>*</h5>
						<h5 className='star_run'>*</h5>
						<h5 className='star_l'>L</h5>
						<h5 className='star_l'>L</h5>
						<h5 className='star_w'>w</h5>
						<h5 className='star_w'>w</h5>
					</div>
				</div>
			</Accordion.Header>
			<Accordion.Body>
				<div className='recent_match_card'>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
							<div className='content'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
						</div>
						<h4>Karachi</h4>
					</div>
					<div className='won_text text-center'>
						<svg
							width='24'
							height='40'
							viewBox='0 0 24 40'
							fill='none'>
							<path
								d='M15 18L12.9 15.825L18.225 10.5H0V7.5H18.225L12.9 2.175L15 0L24 9L15 18Z'
								fill='black'
							/>
							<path
								d='M9 40L11.1 37.825L5.775 32.5H24V29.5H5.775L11.1 24.175L9 22L0 31L9 40Z'
								fill='black'
							/>
						</svg>
						<p>Multan Sultans won by 20 runs</p>
					</div>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='content me-3 text-end'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
						</div>
						<h4 className='text-end'>Multan</h4>
					</div>
				</div>
				<div className='recent_match_card'>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
							<div className='content'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
						</div>
						<h4>Karachi</h4>
					</div>
					<div className='won_text text-center'>
						<svg
							width='24'
							height='40'
							viewBox='0 0 24 40'
							fill='none'>
							<path
								d='M15 18L12.9 15.825L18.225 10.5H0V7.5H18.225L12.9 2.175L15 0L24 9L15 18Z'
								fill='black'
							/>
							<path
								d='M9 40L11.1 37.825L5.775 32.5H24V29.5H5.775L11.1 24.175L9 22L0 31L9 40Z'
								fill='black'
							/>
						</svg>
						<p>Multan Sultans won by 20 runs</p>
					</div>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='content me-3 text-end'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
						</div>
						<h4 className='text-end'>Multan</h4>
					</div>
				</div>
				<div className='recent_match_card'>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
							<div className='content'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
						</div>
						<h4>Karachi</h4>
					</div>
					<div className='won_text text-center'>
						<svg
							width='24'
							height='40'
							viewBox='0 0 24 40'
							fill='none'>
							<path
								d='M15 18L12.9 15.825L18.225 10.5H0V7.5H18.225L12.9 2.175L15 0L24 9L15 18Z'
								fill='black'
							/>
							<path
								d='M9 40L11.1 37.825L5.775 32.5H24V29.5H5.775L11.1 24.175L9 22L0 31L9 40Z'
								fill='black'
							/>
						</svg>
						<p>Multan Sultans won by 20 runs</p>
					</div>
					<div className='team_match_'>
						<div className='img_con'>
							<div className='content me-3 text-end'>
								<h5>169-7</h5>
								<p>20.0 Over</p>
							</div>
							<div className='image'>
								<img
									src='/teaam_mini_dp.png'
									alt='#'
									className='img-fluid'
								/>
							</div>
						</div>
						<h4 className='text-end'>Multan</h4>
					</div>
				</div>
			</Accordion.Body>
		</Accordion.Item>
	</Accordion>
</div> */
}
{
	/* </div>										<h5 className='comman_run single_run'>2</h5>
																	<h5 className='comman_run six_run'>6</h5>
																	<h5 className='comman_run six_run'>6</h5>
																	<h5 className='comman_run six_four'>4</h5>
																	<h5 className='comman_run six_wicket'>w</h5> 
																	*/
}
