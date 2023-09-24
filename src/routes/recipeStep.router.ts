/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as recipeStepService from '../services/recipeStep/recipeStep.service'
import * as recipeStepFactory from '../factories/recipeStep.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'
import sequelize from '../libs/sequelize'

const router = express.Router()

router.get('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const recipeStepModel = await recipeStepService.getRecipeStepById(id)
    const recipeStep = recipeStepFactory.validateRecipeStep(recipeStepModel)
      response.setResponse(recipeStep, ['RecipeStep retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  const transaction = await sequelize.transaction()
  try {
    const createRecipeStep = await recipeStepFactory.validateRecipeStep(req.body)
    const savedRecipeStep = await recipeStepService.saveRecipeStep(createRecipeStep)
    // la transaccion debe ir en el servicio
    // await saveRecipeStepIngredients(createRecipeStep.recipeStepIngredients, savedRecipeStep.id)
    await transaction.commit()
    response.setResponse(savedRecipeStep, ['RecipeStep saved successfully'], false)
  } catch (error: any) {
    const errors = errorHandler(error)
    await transaction.rollback()
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/stepUp/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const recipeStepModel = await recipeStepService.getRecipeStepById(id)
    const recipeStep = await recipeStepFactory.validateRecipeStep(recipeStepModel)
    await recipeStepService.stepUp(recipeStep)
    response.setResponse(recipeStep, ['RecipeStep moved up successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/stepDown/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const recipeStepModel = await recipeStepService.getRecipeStepById(id)
    const recipeStep = await recipeStepFactory.validateRecipeStep(recipeStepModel)
    await recipeStepService.stepDown(recipeStep)
    response.setResponse(recipeStep, ['RecipeStep moved down successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  const transaction = await sequelize.transaction()
  try {
    const id = parseInt(req.params.id)
    const recipeStep = await recipeStepFactory.validatePartialRecipeStep(req.body)
    const savedRecipeStep = await recipeStepService.updateRecipeStep(recipeStep, id)
    response.setResponse(savedRecipeStep, ['RecipeStep updated successfully'], false)
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    await recipeStepService.deleteRecipeStep(id)
    response.setResponse({}, ['RecipeStep deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
