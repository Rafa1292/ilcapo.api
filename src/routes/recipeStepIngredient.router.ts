/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as recipeStepIngredientService from '../services/recipeStepIngredient/recipeStepIngredient.service'
import * as recipeStepIngredientFactory from '../factories/recipeStepIngredient.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const { id, ...createRecipeStepIngredient } = await recipeStepIngredientFactory.toNewRecipeStepIngredient(req.body)
    const savedRecipeStepIngredient = await recipeStepIngredientService.saveRecipeStepIngredient(createRecipeStepIngredient)
    response.setResponse(savedRecipeStepIngredient, ['RecipeStepIngredient saved successfully'], false)
  } catch (error: any) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const recipeStepIngredient = await recipeStepIngredientFactory.toNewRecipeStepIngredient(req.body)
    const savedRecipeStepIngredient = await recipeStepIngredientService.updateRecipeStepIngredient(recipeStepIngredient, id)
    response.setResponse(savedRecipeStepIngredient, ['RecipeStepIngredient updated successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    await recipeStepIngredientService.deleteRecipeStepIngredient(id)
    response.setResponse({}, ['RecipeStepIngredient deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
