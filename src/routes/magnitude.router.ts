/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as magnitudeService from '../services/magnitude/magnitude.service'
import * as magnitudeFactory from '../factories/magnitude.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    response.setResponse(await magnitudeService.getMagnitudes(), ['Magnitudes retrieved successfully'], false)
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
    const magnitude = await magnitudeService.getMagnitudeById(id)
    if (magnitude !== undefined) {
      response.setResponse(magnitude, ['Magnitude retrieved successfully'], false)
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
    const { id, ...createMagnitude } = await magnitudeFactory.toNewMagnitude(req.body)
    const savedMagnitude = await magnitudeService.saveMagnitude(createMagnitude)
    response.setResponse(savedMagnitude, ['Magnitude saved successfully'], false)
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
    const magnitude = await magnitudeFactory.toNewMagnitude(req.body)
    const savedMagnitude = await magnitudeService.updateMagnitude(magnitude, id)
    response.setResponse(savedMagnitude, ['Magnitude updated successfully'], false)
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
    const deletedMagnitude = await magnitudeService.deleteMagnitude(id)
    response.setResponse(deletedMagnitude, ['Magnitude deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
