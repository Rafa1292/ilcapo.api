/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as modifierElementService from '../services/modifierElement/modifierElement.service'
import * as modifierElementFactory from '../factories/modifierElement.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    response.setResponse(await modifierElementService.getModifierElements(), ['ModifierElements retrieved successfully'], false)
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
    const modifierElement = await modifierElementService.getModifierElementById(id)
    if (modifierElement !== undefined) {
      response.setResponse(modifierElement, ['ModifierElement retrieved successfully'], false)
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
    const { id, ...createModifierElement } = await modifierElementFactory.toNewModifierElement(req.body)
    const savedModifierElement = await modifierElementService.saveModifierElement(createModifierElement)
    response.setResponse(savedModifierElement, ['ModifierElement saved successfully'], false)
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
    const modifierElement = await modifierElementFactory.toNewModifierElement(req.body)
    const savedModifierElement = await modifierElementService.updateModifierElement(modifierElement, id)
    response.setResponse(savedModifierElement, ['ModifierElement updated successfully'], false)
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
    const deletedModifierElement = await modifierElementService.deleteModifierElement(id)
    response.setResponse(deletedModifierElement, ['ModifierElement deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
