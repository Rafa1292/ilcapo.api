import express from 'express'
import providersRouter from './routes/provider.route'

const app = express()
app.use(express.json())
const PORT = 3000

app.get('/ping', (_req: any, res: any) => {
  console.log('ping')
  res.send('pong')
})

app.use('/api/v1/providers', providersRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
