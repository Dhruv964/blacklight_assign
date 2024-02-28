import Sequelize from 'sequelize'
import 'dotenv/config'
const URI = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/${process.env.DB_NAME}`
const sequelize = new Sequelize(URI)
const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to db has been established successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
export default { connectDB, sequelize }
