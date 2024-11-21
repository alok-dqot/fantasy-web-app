import React, { useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import useMatchStore from "@/services/match/match.service";
import Link from "next/link";

type TeamConfirmationQuery = {
	match_id: string;
	series_id: string;
};

function index() {
	const router = useRouter();
	const match = useMatchStore();
	const { match_id, series_id } = router.query as TeamConfirmationQuery;
	useEffect(() => {
		if (!router.isReady) return;
		const { match_id, series_id } = router.query as TeamConfirmationQuery;

		match.get.generateTeam(match_id, series_id);
	}, [router.isReady]);


	return (
		<>
			<main>
				<Header />

				<section className='captian_choose_sec'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='heading'>
								<h3>Choose your Captain and Vice Caption</h3>
								<p>C gets 2X points, VC gets 1.5X Points</p>
							</div>
						</div>
						<div className='vc_captain'>
							<div className='heading row'>

								<div className='heading_sub col-6'>
									<h5 className="col-6">TYPE</h5>
									<h5 className="col-3">POINTS</h5>
								</div>
								<div className='heading_sub col-5'>
									<h5 className="col-6">% C BY</h5>
									<h5 className="col-3">% VC BY</h5>
								</div>
							</div>
							{match.match?.Player.length > 0 &&
								match.match?.Player.map((player: any) => {
									return (
										<>
											<div className='type_point_all row'>
												<div className='type_point col-6'>
													<div className='avtar_team col-7'>
														<img
															src='/noImg.png'
															alt='#'
															className='img-fluid'
														/>
														<div className='type_wk'>
															<div className='fg'>
																<p>{player?.country?.toUpperCase()}</p>
															</div>
															<div className='wk_tex'>
																<p>{player?.playing_role}</p>
															</div>
														</div>
													</div>
													<div className='name col-4' >
														<h5>{player?.short_name}</h5>
														<p>{player?.fantasy_player_rating} pts</p>
													</div>
												</div>
												<div className='captain_vice col-5'>
													<div className='captian col-6'>
														{player?.is_captain ? (
															<h5 className='green_color'>C</h5>
														) : (
															<h5>C</h5>
														)}
														<p>2.98%</p>
													</div>
													<div className='captian col-3'>
														{player?.is_vice_captain ? (
															<h5 className='red_color'>VC</h5>
														) : (
															<h5>VC</h5>
														)}
														<p>5.01%</p>
													</div>
												</div>
											</div>
										</>
									);
								})}

							<div className='continue_btn'>
								<Link href={`/teampreview/${match_id}/${match.match.team_generated_id}`}>
									<Button className='continue'>Continue</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>

				<Footer />
			</main>
		</>
	);
}

export default index;







{/* 
							<div className='type_point_all'>
								<div className='type_point'>
									<div className='avtar_team'>
										<img
											src='/captain_avatar.png'
											alt='#'
											className='img-fluid'
										/>
										<div className='type_wk'>
											<div className='fg'>
												<p>BAN-W</p>
											</div>
											<div className='wk_tex'>
												<p>WK</p>
											</div>
										</div>
									</div>
									<div className='name'>
										<h5>R Ghosh</h5>
										<p>482 pts</p>
									</div>
								</div>
								<div className='captain_vice'>
									<div className='captian'>
										<h5>C</h5>
										<p>2.98%</p>
									</div>
									<div className='captian'>
										<h5>VC</h5>
										<p>5.01%</p>
									</div>
								</div>
							</div>
							<div className='type_point_all'>
								<div className='type_point'>
									<div className='avtar_team'>
										<img
											src='/captain_avatar.png'
											alt='#'
											className='img-fluid'
										/>
										<div className='type_wk'>
											<div className='fg'>
												<p>BAN-W</p>
											</div>
											<div className='wk_tex'>
												<p>WK</p>
											</div>
										</div>
									</div>
									<div className='name'>
										<h5>R Ghosh</h5>
										<p>482 pts</p>
									</div>
								</div>
								<div className='captain_vice'>
									<div className='captian'>
										<h5>C</h5>
										<p>2.98%</p>
									</div>
									<div className='captian'>
										<h5>VC</h5>
										<p>5.01%</p>
									</div>
								</div>
							</div>
							<div className='type_point_all'>
								<div className='type_point'>
									<div className='avtar_team'>
										<img
											src='/captain_avatar.png'
											alt='#'
											className='img-fluid'
										/>
										<div className='type_wk'>
											<div className='fg'>
												<p>BAN-W</p>
											</div>
											<div className='wk_tex'>
												<p>WK</p>
											</div>
										</div>
									</div>
									<div className='name'>
										<h5>R Ghosh</h5>
										<p>482 pts</p>
									</div>
								</div>
								<div className='captain_vice'>
									<div className='captian'>
										<h5>C</h5>
										<p>2.98%</p>
									</div>
									<div className='captian'>
										<h5>VC</h5>
										<p>5.01%</p>
									</div>
								</div>
							</div>
							<div className='type_point_all'>
								<div className='type_point'>
									<div className='avtar_team'>
										<img
											src='/captain_avatar.png'
											alt='#'
											className='img-fluid'
										/>
										<div className='type_wk'>
											<div className='fg'>
												<p>BAN-W</p>
											</div>
											<div className='wk_tex'>
												<p>WK</p>
											</div>
										</div>
									</div>
									<div className='name'>
										<h5>R Ghosh</h5>
										<p>482 pts</p>
									</div>
								</div>
								<div className='captain_vice'>
									<div className='captian'>
										<h5>C</h5>
										<p>2.98%</p>
									</div>
									<div className='captian'>
										<h5>VC</h5>
										<p>5.01%</p>
									</div>
								</div>
							</div>
							<div className='type_point_all'>
								<div className='type_point'>
									<div className='avtar_team'>
										<img
											src='/captain_avatar.png'
											alt='#'
											className='img-fluid'
										/>
										<div className='type_wk'>
											<div className='fg'>
												<p>BAN-W</p>
											</div>
											<div className='wk_tex'>
												<p>WK</p>
											</div>
										</div>
									</div>
									<div className='name'>
										<h5>R Ghosh</h5>
										<p>482 pts</p>
									</div>
								</div>
								<div className='captain_vice'>
									<div className='captian'>
										<h5>C</h5>
										<p>2.98%</p>
									</div>
									<div className='captian'>
										<h5>VC</h5>
										<p>5.01%</p>
									</div>
								</div>
							</div>
							<div className='type_point_all'>
								<div className='type_point'>
									<div className='avtar_team'>
										<img
											src='/captain_avatar.png'
											alt='#'
											className='img-fluid'
										/>
										<div className='type_wk'>
											<div className='fg'>
												<p>BAN-W</p>
											</div>
											<div className='wk_tex'>
												<p>WK</p>
											</div>
										</div>
									</div>
									<div className='name'>
										<h5>R Ghosh</h5>
										<p>482 pts</p>
									</div>
								</div>
								<div className='captain_vice'>
									<div className='captian'>
										<h5>C</h5>
										<p>2.98%</p>
									</div>
									<div className='captian'>
										<h5>VC</h5>
										<p>5.01%</p>
									</div>
								</div>
							</div>
							<div className='type_point_all'>
								<div className='type_point'>
									<div className='avtar_team'>
										<img
											src='/captain_avatar.png'
											alt='#'
											className='img-fluid'
										/>
										<div className='type_wk'>
											<div className='fg'>
												<p>BAN-W</p>
											</div>
											<div className='wk_tex'>
												<p>WK</p>
											</div>
										</div>
									</div>
									<div className='name'>
										<h5>R Ghosh</h5>
										<p>482 pts</p>
									</div>
								</div>
								<div className='captain_vice'>
									<div className='captian'>
										<h5>C</h5>
										<p>2.98%</p>
									</div>
									<div className='captian'>
										<h5>VC</h5>
										<p>5.01%</p>
									</div>
								</div>
							</div>
							<div className='type_point_all'>
								<div className='type_point'>
									<div className='avtar_team'>
										<img
											src='/captain_avatar.png'
											alt='#'
											className='img-fluid'
										/>
										<div className='type_wk'>
											<div className='fg'>
												<p>BAN-W</p>
											</div>
											<div className='wk_tex'>
												<p>WK</p>
											</div>
										</div>
									</div>
									<div className='name'>
										<h5>R Ghosh</h5>
										<p>482 pts</p>
									</div>
								</div>
								<div className='captain_vice'>
									<div className='captian'>
										<h5>C</h5>
										<p>2.98%</p>
									</div>
									<div className='captian'>
										<h5>VC</h5>
										<p>5.01%</p>
									</div>
								</div>
							</div> */}