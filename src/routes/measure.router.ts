/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as measureService from '../services/measure/measure.service'
import * as measureFactory from '../factories/measure.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const measureModels = await measureService.getMeasures()
    const measures = await measureFactory.validateMeasures(measureModels)
    response.setResponse(measures, ['Measures retrieved successfully'], false)
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
     await measureService.recoveryMeasure(id)
    response.setResponse({}, ['Measure recovery successfully'], false)
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
    const measureModel = await measureService.getMeasureById(id)
    const measure = await measureFactory.validateMeasure(measureModel)
      response.setResponse(measure, ['Measure retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const createMeasure = await measureFactory.validateMeasure(req.body)
    const savedMeasure = await measureService.saveMeasure(createMeasure)
    response.setResponse(savedMeasure, ['Measure saved successfully'], false)
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
    const measure = await measureFactory.validatePartialMeasure({...req.body, id})
    const savedMeasure = await measureService.updateMeasure(measure, id)
    response.setResponse(savedMeasure, ['Measure updated successfully'], false)
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
    await measureService.deleteMeasure(id)
    response.setResponse({}, ['Measure deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
