import express from 'express';
import playerRouter from './routes/Players.js'
import { getCurrentWeekLeaderboard,getLastWeekLeaderboard,getPlayerDetails } from './models/Players.js';
import path from 'path';
import pool from './connection.js';
const __dirname = path.resolve();

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');

app.use('/api/v1/players',playerRouter)

app.get('/leaderboard/currentweek', async (req, res) => {
    const getCurrentWeekLeaderboardData = await getCurrentWeekLeaderboard();
    res.render('index', { title: 'Current Week LeaderBoard', data: getCurrentWeekLeaderboardData,isTable:true })
})

app.get('/leaderboard/lastweek/:country', async (req, res) => {
    const country = req.params.country;
    const getLastWeekLeaderboardData = await getLastWeekLeaderboard(country);
    res.render('index', { title: `Last Week LeaderBoard of Country ${country}`, data: getLastWeekLeaderboardData,isTable:true })
})

app.get('/rank/:uid', async (req, res) => {
    const uid = req.params.uid;
        const playerDetails = await getPlayerDetails(uid);
    res.render('index', { title: `Details of Player of UID ${uid}`, data: playerDetails })
})

const start = async() => {
    try {
     console.log('Connected to DB')
     app.listen(3000,() => {console.log("Listening on Port 3000")})
    }
    catch(error){
     console.error(error)
    }
    }
    
start()
