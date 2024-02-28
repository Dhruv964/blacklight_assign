import { Router } from "express";
import { getCurrentWeekLeaderboard, getLastWeekLeaderboard, getPlayerDetails } from "../models/Players.js";

const router = Router();

router.get('/rank/:uid',async (req, res) => {
    try{
        const uid = req.params.uid;
        const playerDetails = await getPlayerDetails(uid);
        res.json(playerDetails)
    }catch(error){
        console.error(error);
        res.status(501)
    }
})

router.get('/leaderboard/currentweek',async (req, res) => {
    try{
        const getCurrentWeekLeaderboardData = await getCurrentWeekLeaderboard();
        res.json(getCurrentWeekLeaderboardData)
    }catch(error){
        console.error(error);
        res.status(501)
    }
})

router.get('/leaderboard/lastweek/:country',async (req, res) => {
    try{
        const country = req.params.country;
        const getLastWeekLeaderboardData = await getLastWeekLeaderboard(country);
        res.json(getLastWeekLeaderboardData)
    }catch(error){
        console.error(error);
        res.status(501)
    }
})

export default router;