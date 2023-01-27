import express from 'express'
import { setUpModels } from './db/models'
import sequelize from './libs/sequelize'
import providersRouter from './routes/provider.route'
import cors from 'cors'

const app = express()
app.use(express.json())
const PORT = 3001

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use('/api/v1/providers', providersRouter)

app.listen(PORT, () => {
  console.log(`Server running again on port ${PORT}`)
})

setUpModels(sequelize).then(() =>
  console.log('models setup'))
  .catch((err: string) =>
    console.log('unable to set models' + err))
