/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as preparationStepInputService from '../services/preparationStepInput/preparationStepInput.service'
import * as preparationStepInputFactory from '../factories/preparationStepInput.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const { id, ...createPreparationStepInput } = await preparationStepInputFactory.validatePreparationStepInput(req.body)
    const savedPreparationStepInput = await preparationStepInputService.savePreparationStepInput(createPreparationStepInput)
    response.setResponse(savedPreparationStepInput, ['PreparationStepInput saved successfully'], false)
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
    const preparationStepInput = await preparationStepInputFactory.validatePreparationStepInput(req.body)
    const savedPreparationStepInput = await preparationStepInputService.updatePreparationStepInput(preparationStepInput, id)
    response.setResponse(savedPreparationStepInput, ['PreparationStepInput updated successfully'], false)
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
    await preparationStepInputService.deletePreparationStepInput(id)
    response.setResponse({}, ['PreparationStepInput deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
