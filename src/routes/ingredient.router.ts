/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as ingredientService from '../services/ingredient/ingredient.service'
import * as ingredientFactory from '../factories/ingredient.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const ingredientModels = await ingredientService.getIngredients()
    const ingredients = await ingredientFactory.validateIngredients(ingredientModels)
    response.setResponse(ingredients, ['Ingredients retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse([], errors, true)
  }
  res.send(response)
})

router.get('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const ingredientModel = await ingredientService.getIngredientById(id)
    if (ingredientModel !== undefined) {
      const ingredient = await ingredientFactory.validateIngredient(ingredientModel)
      response.setResponse(ingredient, ['Ingredient retrieved successfully'], false)
    }
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const createIngredient = await ingredientFactory.validateIngredient(req.body)
    const savedIngredient = await ingredientService.saveIngredient(createIngredient)
    response.setResponse(savedIngredient, ['Ingredient saved successfully'], false)
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
    const ingredient = await ingredientFactory.validatePartialIngredient({...req.body,  id})
    const savedIngredient = await ingredientService.updateIngredient(ingredient, id)
    response.setResponse(savedIngredient, ['Ingredient updated successfully'], false)
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
    const deletedIngredient = await ingredientService.deleteIngredient(id)
    response.setResponse(deletedIngredient, ['Ingredient deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.patch('/recovery/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
     await ingredientService.recoveryIngredient(id)
    response.setResponse({}, ['Ingredient recovery successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
