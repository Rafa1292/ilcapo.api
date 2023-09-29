/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as recipeService from '../services/recipe/recipe.service'
import * as recipeFactory from '../factories/recipe.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const recipeModels = await recipeService.getRecipes()
    const recipes = await recipeFactory.validateRecipes(recipeModels)
    response.setResponse(recipes, ['Recipes retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse([], errors, true)
  }
  res.send(response)
})

router.patch('/recovery/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
     await recipeService.recoveryRecipe(id)
    response.setResponse({}, ['Recipe recovery successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const recipeModel = await recipeService.getRecipeById(id)
    const recipe = await recipeFactory.validateRecipe(recipeModel)
    response.setResponse(recipe, ['Recipe retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const createRecipe = await recipeFactory.validateRecipe(req.body)
    const savedRecipe = await recipeService.saveRecipe(createRecipe)
    response.setResponse(savedRecipe, ['Recipe saved successfully'], false)
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
    const recipe = await recipeFactory.validatePartialRecipe(req.body)
    const savedRecipe = await recipeService.updateRecipe(recipe, id)
    response.setResponse(savedRecipe, ['Recipe updated successfully'], false)
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
    await recipeService.deleteRecipe(id)
    response.setResponse({}, ['Recipe deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
