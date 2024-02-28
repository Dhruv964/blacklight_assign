import connection from '../connection.js'
import moment from 'moment'

const getFormattedResult = (result) => {
  const formattedResults = result[0].map((row) => ({
    uid: row.UID,
    rank: row.player_rank,
    name: row.Name,
    score: Math.trunc(row.Score),
    country: row.Country,
  }))

  return formattedResults
}

export const getPlayerDetails = async (uid) => {
  try {
    const result = await connection.sequelize.query(
      `select uid,name,(total_score/num_scores) as avg_score,country,
      dense_rank() over(order by total_score/num_scores desc) 
      as player_rank from
      (SELECT uid, name, SUM(score) AS total_score, COUNT(*) AS num_scores, country
      FROM players 
      GROUP BY uid) as player_with_scrore where uid = ?;`,
      [uid]
    )

    if (!result[0].length) {
      return new Error('No data available for provided week leaderboard.')
    }

    return getFormattedResult(result)
  } catch (error) {
    return new Error(`Error fetching player: ${error.message}`)
  }
}

const getLeaderboard = async (startOfWeek, endOfWeek, ...options) => {
  try {
    const countryQuery = ''
    if (options.length > 0) {
      countryQuery = 'and ' + options[0]
    }

    const result = await connection.sequelize.query(
      `select *,RANK() over (order by Score DESC) as player_rank from MOCK_DATA order by Score DESC`
    )

    if (!result[0].length) {
      console.log('No data available for provided week leaderboard.')
      return new Error('No data available for provided week leaderboard.')
    }

    return getFormattedResult(result)
  } catch (error) {
    return new Error(`Error fetching leaderboard: ${error.message}`)
  }
}

const getCurrentWeek = () => {
  let startOfWeek = moment().startOf('week').toDate()
  let endOfWeek = moment().endOf('week').toDate()
  return [startOfWeek, endOfWeek]
}

const getLastWeek = () => {
  let startOfWeek = moment().subtract(1, 'weeks').startOf('week').toDate()
  let endOfWeek = moment().subtract(1, 'weeks').endOf('week').toDate()
  return [startOfWeek, endOfWeek]
}

export const getCurrentWeekLeaderboard = async () => {
  try {
    const [startOfWeek, endOfWeek] = getCurrentWeek()
    console.log(startOfWeek, endOfWeek)
    return await getLeaderboard(startOfWeek, endOfWeek)
  } catch (error) {
    return new Error(`Error fetching leaderboard: ${error.message}`)
  }
}

export const getLastWeekLeaderboard = async (country) => {
  try {
    const [startOfWeek, endOfWeek] = getLastWeek()
    console.log(startOfWeek, endOfWeek)
    return await getLeaderboard(startOfWeek, endOfWeek, country)
  } catch (error) {
    return new Error(`Error fetching leaderboard: ${error.message}`)
  }
}
