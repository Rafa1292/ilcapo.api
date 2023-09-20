/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as preparationStepService from '../services/preparationStep/preparationStep.service'
import * as preparationStepFactory from '../factories/preparationStep.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'
import sequelize from '../libs/sequelize'
import { savePreparationStepInputs } from '../services/preparationStepInput/preparationStepInput.service'

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
  const transaction = await sequelize.transaction()
  try {
    const { id, ...createPreparationStep } = await preparationStepFactory.validatePreparationStep(req.body)
    const savedPreparationStep = await preparationStepService.savePreparationStep(createPreparationStep)
    await savePreparationStepInputs(createPreparationStep.preparationStepInputs, savedPreparationStep.id)
    await transaction.commit()
    response.setResponse(savedPreparationStep, ['PreparationStep saved successfully'], false)
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
    const preparationStep = await preparationStepService.getPreparationStepById(id)
    if (preparationStep === undefined) throw new Error('PreparationStep not found')
    await preparationStepService.stepUp(preparationStep)
    response.setResponse(preparationStep, ['PreparationStep moved up successfully'], false)
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
    const preparationStep = await preparationStepService.getPreparationStepById(id)
    if (preparationStep === undefined) throw new Error('PreparationStep not found')
    await preparationStepService.stepDown(preparationStep)
    response.setResponse(preparationStep, ['PreparationStep moved down successfully'], false)
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
    const preparationStep = await preparationStepFactory.validatePreparationStep(req.body)
    const savedPreparationStep = await preparationStepService.updatePreparationStep(preparationStep, id)
    response.setResponse(savedPreparationStep, ['PreparationStep updated successfully'], false)
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
    const deletedPreparationStep = await preparationStepService.deletePreparationStep(id)
    response.setResponse(deletedPreparationStep, ['PreparationStep deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
