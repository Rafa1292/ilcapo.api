/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as modifierGroupService from '../services/modifierGroup/modifierGroup.service'
import * as modifierGroupFactory from '../factories/modifierGroup.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    response.setResponse(await modifierGroupService.getModifierGroups(), ['ModifierGroups retrieved successfully'], false)
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
    const modifierGroup = await modifierGroupService.getModifierGroupById(id)
    if (modifierGroup !== undefined) {
      response.setResponse(modifierGroup, ['ModifierGroup retrieved successfully'], false)
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
    const { id, ...createModifierGroup } = await modifierGroupFactory.validateModifierGroup(req.body)
    const savedModifierGroup = await modifierGroupService.saveModifierGroup(createModifierGroup)
    response.setResponse(savedModifierGroup, ['ModifierGroup saved successfully'], false)
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
    const modifierGroup = await modifierGroupFactory.validateModifierGroup(req.body)
    const savedModifierGroup = await modifierGroupService.updateModifierGroup(modifierGroup, id)
    response.setResponse(savedModifierGroup, ['ModifierGroup updated successfully'], false)
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
    const deletedModifierGroup = await modifierGroupService.deleteModifierGroup(id)
    response.setResponse(deletedModifierGroup, ['ModifierGroup deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
