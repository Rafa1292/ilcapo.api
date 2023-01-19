import express from 'express'
import providersRouter from './routes/provider.route'
import { setUpModels } from './db/models'

const app = express()
app.use(express.json())
const PORT = 3000

app.get('/ping', (_req: any, res: any) => {
  console.log('ping')
  res.send('pong')
})

app.use('/api/v1/providers', providersRouter)

app.listen(PORT, () => {
  console.log(`Server running again on port ${PORT}`)
})

setUpModels().then(() => {
  console.log('Models are set up')
}).catch((err) => {
  console.log('Error setting up models', err)
})
