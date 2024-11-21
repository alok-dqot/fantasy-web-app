import React, { useEffect } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router';
import useMatchStore from '@/services/match/match.service';


type TeamConfirmationQuery = {
    match_id: string;
    redis_id: string;
};

function Index() {

    const router = useRouter();
    const match = useMatchStore();

    useEffect(() => {
        if (!router.isReady) return;
        const { match_id, redis_id } = router.query as TeamConfirmationQuery;

        match.get.generateRedisData(match_id, redis_id);
    }, [router.isReady]);



    return (
        <>
            <main>
                <Header />
                <section className='team_privew_sec'>
                    <div className="heading">
                        <div className="mini_heading">
                            <h4>Player</h4>
                        </div>
                        <div className="playes_crdit">
                            <div className="player">
                                <h5>Players</h5>
                                <h6>{match.match?.team_preview?.length}/11</h6>
                            </div>
                            <div className="ratio_content">
                                <Button className='white_btn'>Credit </Button>
                                <p>6 : 5</p>
                                <Button className='black_btn'>B- W</Button>
                            </div>
                            <div className="player">
                                <h5>Credit Left</h5>
                                <h6 className='text-end'>11.5</h6>
                            </div>
                        </div>
                    </div>
                    <div className="team_preview_main">
                        <div className="team_preview_img">
                            <img src="/team_preview_img.svg" alt="team_preview_img" className='img-fluid' />
                            <div className="wick_heading_common wicket_heading">
                                <h4>Wickets-Keepers</h4>
                            </div>
                            <div className="common_player wicket_keeper">
                                {match.match?.team_preview?.length > 0 &&
                                    match.match?.team_preview?.map((player: any) => {

                                        if (player?.playing_role == 'wk') {

                                            return (
                                                <>
                                                    <div className="name_avtar">
                                                        <img src="/noImg.png" alt="avtar" className='img-fluid' />
                                                        <Button className='player_name d-block'>{player?.short_name}</Button>
                                                        <p>{player?.fantasy_player_rating} Cr</p>
                                                    </div>
                                                </>)
                                        }
                                    })}
                            </div>
                            <div className="wick_heading_common batter_heading">
                                <h4>Batters</h4>
                            </div>
                            <div className="common_player batter_player">
                                {match.match?.team_preview?.length > 0 &&
                                    match.match?.team_preview?.map((player: any) => {

                                        if (player?.playing_role == 'bat') {

                                            return (
                                                <>
                                                    <div className="name_avtar">
                                                        <img src="/noImg.png" alt="avtar" className='img-fluid' />
                                                        <Button className='player_name d-block'>{player?.short_name}</Button>
                                                        <p>{player?.fantasy_player_rating} Cr</p>
                                                    </div>
                                                </>)
                                        }
                                    })}

                            </div>
                            <div className="wick_heading_common allrounder_heading">
                                <h4>All - Rounders</h4>
                            </div>
                            <div className="common_player allrounder_player">
                                {match.match?.team_preview?.length > 0 &&
                                    match.match?.team_preview?.map((player: any) => {

                                        if (player?.playing_role == 'all') {

                                            return (
                                                <>
                                                    <div className="name_avtar">
                                                        <img src="/noImg.png" alt="avtar" className='img-fluid' />
                                                        <Button className='player_name d-block'>{player?.short_name}</Button>
                                                        <p>{player?.fantasy_player_rating} Cr</p>
                                                    </div>
                                                </>)
                                        }
                                    })}

                            </div>
                            <div className="wick_heading_common bowler_heading">
                                <h4>Bowler</h4>
                            </div>
                            <div className="common_player bowler_player">

                                {match.match?.team_preview?.length > 0 &&
                                    match.match?.team_preview?.map((player: any) => {

                                        if (player?.playing_role == 'bowl') {

                                            return (
                                                <>
                                                    <div className="name_avtar">
                                                        <img src="/noImg.png" alt="avtar" className='img-fluid' />
                                                        <Button className='player_name d-block'>{player?.short_name}</Button>
                                                        <p>{player?.fantasy_player_rating} Cr</p>
                                                    </div>
                                                </>)
                                        }
                                    })}

                            </div>
                        </div>

                    </div>
                </section>
                <Footer />
            </main>
        </>
    )
}

export default Index