import express from 'express'
import { setUpModels } from './db/models'
import sequelize from './libs/sequelize'
import providersRouter from './routes/provider.route'
import magnitudesRouter from './routes/magnitude.router'
import measureRouter from './routes/measure.router'
import inputCategoryRouter from './routes/inputCategory.router'
import inputRouter from './routes/input.router'
import providerInputRouter from './routes/providerInput.router'
import brandRouter from './routes/brand.router'
import ingredientCategoryRouter from './routes/ingredientCategory.router'
import cors from 'cors'

const app = express()
app.use(express.json())
const PORT = 3001

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use('/api/v1/providers', providersRouter)
app.use('/api/v1/magnitudes', magnitudesRouter)
app.use('/api/v1/measures', measureRouter)
app.use('/api/v1/inputCategories', inputCategoryRouter)
app.use('/api/v1/inputs', inputRouter)
app.use('/api/v1/providerInputs', providerInputRouter)
app.use('/api/v1/brands', brandRouter)
app.use('/api/v1/ingredientCategories', ingredientCategoryRouter)

app.listen(PORT, () => {
  console.log(`Server running again on port ${PORT}`)
})

setUpModels(sequelize).then(() =>
  console.log('models setup'))
  .catch((err: string) =>
    console.log('unable to set models' + err))
