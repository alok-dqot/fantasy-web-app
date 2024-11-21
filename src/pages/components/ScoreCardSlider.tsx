import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import Image from "next/image";
import Link from "next/link";
import useMatchStore from "@/services/match/match.service";
import moment from "moment";

function ScoreCardSlider() {
	const matchStore = useMatchStore();

	return (
		<>
			<div className='swiper_score_card'>
				<div className='heading'>
					<h2>Featured Matches</h2>
				</div>
				<Swiper
					slidesPerView={3}
					spaceBetween={30}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					cssMode={true}
					navigation={true}
					keyboard={true}
					modules={[Autoplay, Navigation]}
					pagination={{
						clickable: true,
					}}
					breakpoints={{
						0: {
							slidesPerView: 1,
							spaceBetween: 20,
						},
						640: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 40,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 50,
						},
					}}
					className='mySwiper'>
					{matchStore.match?.featured_list?.length ? (
						matchStore.match?.featured_list?.map((item) => {
							return (
								<SwiperSlide>
									<Link href={`/match/${item.match_id}`}>
										<div className='score_card'>
											<div className='score_cs'>
												{/* <Image src="/vs_icon.png" alt="#" width={25} height={25} className='vs_img' /> */}
												<div className='team_flag_main'>
													<div className='team_flag grey_bg'>
														<Image
															src={item?.teama?.logo_url}
															alt='#'
															width={50}
															height={50}
														/>
													</div>
													<div className='team_flag blue_bg'>
														<Image
															src={item?.teamb?.logo_url}
															alt='#'
															width={50}
															height={50}
														/>
													</div>
												</div>
											</div>
											<div className='card_bg'>
												<div className='d-flex align-items-center justify-content-between padding_div'>
													<div className='scroe_flag'>
														<div className='team_flag_one mb-3'>
															<div className='imgfl'>
																<Image
																	src={item?.teama?.logo_url}
																	alt='#'
																	width={40}
																	height={40}
																/>
															</div>
															<div className='name'>
																<h4>{item?.teama?.short_name}</h4>
															</div>
														</div>
														<div className='team_flag_one'>
															<div className='imgfl'>
																<Image
																	src={item?.teamb?.logo_url}
																	alt='#'
																	width={40}
																	height={40}
																/>
															</div>
															<div className='name'>
																<h4>{item?.teamb?.short_name}</h4>
															</div>
														</div>
													</div>
													<div className='scroe_flag'>
														<Image
															src='/vs_icon.png'
															alt='#'
															width={25}
															height={25}
															className=''
														/>
													</div>
													<div className='scroe_titles'>
														<h5 className='mt-1'>{item?.teama?.scores_full}</h5>
														<h5 className='mt-5'>{item?.teamb?.scores_full}</h5>
													</div>
												</div>
												{
													item?.status_str.toLowerCase() == 'scheduled' ?
														<p className='win_text'>
															<svg
																width='9'
																height='9'
																viewBox='0 0 9 9'
																fill='none'>
																<circle cx='4.5' cy='4.5' r='4.5' fill='#00B533' />
															</svg>
															Scheduled at : {moment(item?.date_start).format(" Do MMM")} {moment(item?.date_start).format('LT')}
														</p>
														:
														item?.status_str.toLowerCase() == 'live'
															?
															<p className='win_text' style={{ color: 'red' }}>
																<svg
																	width='9'
																	height='9'
																	viewBox='0 0 9 9'
																	fill='none'>
																	<circle cx='4.5' cy='4.5' r='4.5' fill='red' />
																</svg>
																Live {item?.status_note}
															</p>
															:
															<p className='win_text' style={{ color: 'grey' }}>
																<svg
																	width='9'
																	height='9'
																	viewBox='0 0 9 9'
																	fill='none'>
																	<circle cx='4.5' cy='4.5' r='4.5' fill='grey' />
																</svg>
																Completed
															</p>
												}
												<div className='match_name'>
													<h5>
														{item?.competition?.title}
														{" - "}
														{item?.competition?.season}{" "}
													</h5>
												</div>
											</div>
										</div>
									</Link>
								</SwiperSlide>
							);
						})
					) : (
						<></>
					)}
				</Swiper>
			</div >
		</>
	);
}

export default ScoreCardSlider;
