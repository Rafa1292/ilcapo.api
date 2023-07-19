import express from 'express'
import cors from 'cors'
import { setUpModels } from './db/models'
import sequelize from './libs/sequelize'
import providersRouter from './routes/provider.route'
import magnitudesRouter from './routes/magnitude.router'
import measureRouter from './routes/measure.router'
import inputCategoryRouter from './routes/inputCategory.router'
import inputRouter from './routes/input.router'
import productRouter from './routes/product.router'
import providerInputRouter from './routes/providerInput.router'
import brandRouter from './routes/brand.router'
import ingredientCategoryRouter from './routes/ingredientCategory.router'
import saleItemCategoryRouter from './routes/saleItemCategory.router'
import saleItemRouter from './routes/saleItem.router'
import ingredientRouter from './routes/ingredient.router'
import preparationStepRouter from './routes/preparationStep.router'
import preparationStepInputRouter from './routes/preparationStepInput.router'
import recipeRouter from './routes/recipe.router'
import recipeStepRouter from './routes/recipeStep.router'
import recipeStepIngredientRouter from './routes/recipeStepIngredient.router'
import modifierGroupRouter from './routes/modifierGroup.router'
import modifierElementRouter from './routes/modifierElement.router'
import productModifierRouter from './routes/productModifier.router'
import saleItemProductRouter from './routes/saleItemProduct.router'
import productRecipeRouter from './routes/productRecipe.router'
import productReferenceRouter from './routes/productReference.router'
import modifierElementUpgradeRouter from './routes/modifierElementUpgrade.router'
import menuRouter from './routes/menu.router'
import itemPriceRouter from './routes/itemPrice.router'
import upgradeElementPriceRouter from './routes/upgradeElementPrice.router'
import { elementPriceRouter } from './routes/elementPrice.router'

const app = express()
app.use(express.json())
const PORT = 4008

app.use(cors({
  origin: ['http://localhost:3008', 'http://localhost:3001']
}))
app.use('/api/v1/providers', providersRouter)
app.use('/api/v1/magnitudes', magnitudesRouter)
app.use('/api/v1/measures', measureRouter)
app.use('/api/v1/inputCategories', inputCategoryRouter)
app.use('/api/v1/saleItemCategories', saleItemCategoryRouter)
app.use('/api/v1/saleItemProducts', saleItemProductRouter)
app.use('/api/v1/saleItems', saleItemRouter)
app.use('/api/v1/inputs', inputRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/providerInputs', providerInputRouter)
app.use('/api/v1/brands', brandRouter)
app.use('/api/v1/ingredientCategories', ingredientCategoryRouter)
app.use('/api/v1/ingredients', ingredientRouter)
app.use('/api/v1/preparationSteps', preparationStepRouter)
app.use('/api/v1/preparationStepInputs', preparationStepInputRouter)
app.use('/api/v1/recipes', recipeRouter)
app.use('/api/v1/recipeSteps', recipeStepRouter)
app.use('/api/v1/recipeStepIngredients', recipeStepIngredientRouter)
app.use('/api/v1/modifierGroups', modifierGroupRouter)
app.use('/api/v1/modifierElementUpgrades', modifierElementUpgradeRouter)
app.use('/api/v1/modifierElements', modifierElementRouter)
app.use('/api/v1/productModifiers', productModifierRouter)
app.use('/api/v1/productRecipes', productRecipeRouter)
app.use('/api/v1/productReferences', productReferenceRouter)
app.use('/api/v1/menus', menuRouter)
app.use('/api/v1/itemPrices', itemPriceRouter)
app.use('/api/v1/upgradePrices', upgradeElementPriceRouter)
app.use('/api/v1/elementPrices', elementPriceRouter)

app.listen(PORT, () => {
  console.log(`Server running again on port ${PORT}`)
})

setUpModels(sequelize).then(() =>
  console.log('models setup'))
  .catch((err: string) =>
    console.log('unable to set models' + err))
