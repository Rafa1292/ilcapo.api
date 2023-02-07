/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as preparationStepService from '../services/preparationStep/preparationStep.service'
import * as preparationStepFactory from '../factories/preparationStep.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const preparationStep = await preparationStepService.getPreparationStepById(id)
    if (preparationStep !== undefined) {
      response.setResponse(preparationStep, ['PreparationStep retrieved successfully'], false)
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
    const { id, ...createPreparationStep } = await preparationStepFactory.toNewPreparationStep(req.body)
    const savedPreparationStep = await preparationStepService.savePreparationStep(createPreparationStep)
    response.setResponse(savedPreparationStep, ['PreparationStep saved successfully'], false)
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
    const preparationStep = await preparationStepFactory.toNewPreparationStep(req.body)
    const savedPreparationStep = await preparationStepService.updatePreparationStep(preparationStep, id)
    response.setResponse(savedPreparationStep, ['PreparationStep updated successfully'], false)
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
    const deletedPreparationStep = await preparationStepService.deletePreparationStep(id)
    response.setResponse(deletedPreparationStep, ['PreparationStep deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
