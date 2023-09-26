/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as ingredientCategoryService from '../services/ingredientCategory/ingredientCategory.service'
import * as ingredientCategoryFactory from '../factories/ingredientCategory.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'
import { IngredientCategory } from '../services/ingredientCategory/ingredientCategory.types'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const ingredientCatgoryModels: IngredientCategory[] = await ingredientCategoryService.getIngredientCategories()
    const ingredientCategories = await ingredientCategoryFactory.validateIngredientCategories(ingredientCatgoryModels)
    response.setResponse(ingredientCategories, ['Ingredient categories retrieved successfully'], false)
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
     await ingredientCategoryService.recoveryIngredientCategory(id)
    response.setResponse({}, ['Category recovery successfully'], false)
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
    const ingredientCategoryModel = await ingredientCategoryService.getIngredientCategoryById(id)
    if (ingredientCategoryModel !== undefined) {
      const ingredientCategory = await ingredientCategoryFactory.validateIngredientCategory(ingredientCategoryModel)
      response.setResponse(ingredientCategory, ['Ingredient category retrieved successfully'], false)
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
    const createIngredientCategory = await ingredientCategoryFactory.validateIngredientCategory(req.body)
    const savedIngredientCategory = await ingredientCategoryService.saveIngredientCategory(createIngredientCategory)
    response.setResponse(savedIngredientCategory, ['Ingredient category saved successfully'], false)
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
    const ingredientCategory = await ingredientCategoryFactory.validatePartialIngredientCategory({...req.body, id})
    const savedIngredientCategory = await ingredientCategoryService.updateIngredientCategory(ingredientCategory, id)
    response.setResponse(savedIngredientCategory, ['Ingredient category updated successfully'], false)
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
    await ingredientCategoryService.deleteIngredientCategory(id)
    response.setResponse({}, ['Ingredient category deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
