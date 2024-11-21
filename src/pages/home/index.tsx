import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScoreCardSlider from "../components/ScoreCardSlider";
import Image from "next/image";
import useMatchStore from "@/services/match/match.service";
import useSeriesStore from "@/services/series/series.service";
import moment from "moment";
import { useRouter } from "next/router";

function Index() {
	const matchStore = useMatchStore();

	const route = useRouter()
	const seriesStore = useSeriesStore()

	useEffect(() => {
		matchStore.get.featuredMatches();

		seriesStore.get.paginate({ size: 9 })
	}, []);
	return (
		<main>
			<Header />
			<ScoreCardSlider />
			<section className='cricket_match_blog_sec'>
				<div className='row'>
					<div className='col-md-12'>
						<div className='heading'>
							<h2>Series</h2>
						</div>
					</div>
				</div>
				<div className='row'>
					{
						seriesStore.competition.list.length > 0 && seriesStore.competition.list?.map((comp: any) => {
							return (
								<>
									<div className='col-md-6'>
										<div className='blog_card'>
											<div className='blog-img'>
												<Image src='/seriesNoImg.jpg' alt='#' width={100} height={100} />
											</div>
											<div className='content'>
												<h4>{comp?.game_format}</h4>
												<p>{comp?.title}</p>
												<button className='btn btn-primary read_more_btn'>
													Read More
													<svg width='7' height='11' viewBox='0 0 7 11' fill='none'>
														<path
															d='M0.31045 0.287878C0.408802 0.196622 0.525625 0.124223 0.654233 0.0748249C0.782841 0.0254269 0.920708 0 1.05994 0C1.19917 0 1.33704 0.0254269 1.46565 0.0748249C1.59426 0.124223 1.71108 0.196622 1.80943 0.287878L6.6891 4.80622C6.78765 4.89728 6.86584 5.00546 6.91919 5.12454C6.97254 5.24363 7 5.37128 7 5.50021C7 5.62913 6.97254 5.75679 6.91919 5.87587C6.86584 5.99496 6.78765 6.10313 6.6891 6.1942L1.80943 10.7125C1.71101 10.8037 1.59416 10.876 1.46556 10.9253C1.33696 10.9746 1.19913 11 1.05994 11C0.920748 11 0.782917 10.9746 0.654319 10.9253C0.525721 10.876 0.408874 10.8037 0.31045 10.7125C0.212025 10.6214 0.133951 10.5132 0.0806837 10.3941C0.0274167 10.2751 0 10.1474 0 10.0185C0 9.88966 0.0274167 9.76204 0.0806837 9.64296C0.133951 9.52388 0.212025 9.41569 0.31045 9.32455L4.43531 5.49529L0.31045 1.67586C-0.104163 1.29195 -0.0935316 0.661946 0.31045 0.287878Z'
															fill='white'
														/>
													</svg>
												</button>
												<h5>
													<svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
														<path
															d='M10.2 1.2H9V0.6C9 0.44087 8.93679 0.288258 8.82426 0.175736C8.71174 0.0632141 8.55913 0 8.4 0C8.24087 0 8.08826 0.0632141 7.97574 0.175736C7.86321 0.288258 7.8 0.44087 7.8 0.6V1.2H4.2V0.6C4.2 0.44087 4.13679 0.288258 4.02426 0.175736C3.91174 0.0632141 3.75913 0 3.6 0C3.44087 0 3.28826 0.0632141 3.17574 0.175736C3.06321 0.288258 3 0.44087 3 0.6V1.2H1.8C1.32261 1.2 0.864773 1.38964 0.527208 1.72721C0.189642 2.06477 0 2.52261 0 3V10.2C0 10.6774 0.189642 11.1352 0.527208 11.4728C0.864773 11.8104 1.32261 12 1.8 12H10.2C10.6774 12 11.1352 11.8104 11.4728 11.4728C11.8104 11.1352 12 10.6774 12 10.2V3C12 2.52261 11.8104 2.06477 11.4728 1.72721C11.1352 1.38964 10.6774 1.2 10.2 1.2ZM10.8 10.2C10.8 10.3591 10.7368 10.5117 10.6243 10.6243C10.5117 10.7368 10.3591 10.8 10.2 10.8H1.8C1.64087 10.8 1.48826 10.7368 1.37574 10.6243C1.26321 10.5117 1.2 10.3591 1.2 10.2V6H10.8V10.2ZM10.8 4.8H1.2V3C1.2 2.84087 1.26321 2.68826 1.37574 2.57574C1.48826 2.46321 1.64087 2.4 1.8 2.4H3V3C3 3.15913 3.06321 3.31174 3.17574 3.42426C3.28826 3.53679 3.44087 3.6 3.6 3.6C3.75913 3.6 3.91174 3.53679 4.02426 3.42426C4.13679 3.31174 4.2 3.15913 4.2 3V2.4H7.8V3C7.8 3.15913 7.86321 3.31174 7.97574 3.42426C8.08826 3.53679 8.24087 3.6 8.4 3.6C8.55913 3.6 8.71174 3.53679 8.82426 3.42426C8.93679 3.31174 9 3.15913 9 3V2.4H10.2C10.3591 2.4 10.5117 2.46321 10.6243 2.57574C10.7368 2.68826 10.8 2.84087 10.8 3V4.8Z'
															fill='black'
														/>
													</svg>
													{moment(comp?.datestart).format('DD MMMM')} - {moment(comp?.dateend).format('DD MMMM')}
												</h5>
											</div>
											<div className='match_button'>
												<button className='btn btn-primary match_red_btn'>
													Series
												</button>
											</div>
										</div>
									</div>
								</>
							)
						})
					}


				</div>
				<div className='row'>
					<div className='col-md-12'>
						<div className='load_more_btn text-center'>
							<button className='btn btn-primary laod_more_btn' onClick={() => {
								route.push('/series')
							}}>
								More Series
								<svg width='9' height='15' viewBox='0 0 9 15' fill='none'>
									<path
										d='M0.39915 0.392561C0.525602 0.268121 0.675804 0.169395 0.841157 0.102034C1.00651 0.0346731 1.18377 0 1.36278 0C1.5418 0 1.71905 0.0346731 1.88441 0.102034C2.04976 0.169395 2.19996 0.268121 2.32641 0.392561L8.60027 6.55393C8.72698 6.67812 8.82751 6.82562 8.8961 6.98801C8.96469 7.1504 9 7.32448 9 7.50028C9 7.67609 8.96469 7.85017 8.8961 8.01256C8.82751 8.17494 8.72698 8.32245 8.60027 8.44664L2.32641 14.608C2.19987 14.7323 2.04963 14.8309 1.88429 14.8981C1.71895 14.9654 1.54174 15 1.36278 15C1.18382 15 1.00661 14.9654 0.841268 14.8981C0.675927 14.8309 0.525696 14.7323 0.39915 14.608C0.272604 14.4837 0.172222 14.3362 0.103736 14.1738C0.0352497 14.0114 0 13.8374 0 13.6617C0 13.4859 0.0352497 13.3119 0.103736 13.1495C0.172222 12.9871 0.272604 12.8396 0.39915 12.7153L5.70254 7.49357L0.39915 2.28527C-0.133924 1.76175 -0.120255 0.902653 0.39915 0.392561Z'
										fill='white'
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}

export default Index;
