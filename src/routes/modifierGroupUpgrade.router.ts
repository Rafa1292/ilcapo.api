/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as modifierGroupUpgradeService from '../services/modifierGroupUpgrade/modifierGroupUpgrade.service'
import * as modifierGroupUpgradeFactory from '../factories/modifierGroupUpgrade.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const createModifierGroupUpgrade = await modifierGroupUpgradeFactory.toNewModifierGroupUpgrade(req.body)
    const savedModifierGroupUpgrade = await modifierGroupUpgradeService.saveModifierGroupUpgrade(createModifierGroupUpgrade)
    response.setResponse(savedModifierGroupUpgrade, ['ModifierGroupUpgrade saved successfully'], false)
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
    const modifierGroupUpgrade = await modifierGroupUpgradeFactory.toNewModifierGroupUpgrade(req.body)
    const savedModifierGroupUpgrade = await modifierGroupUpgradeService.updateModifierGroupUpgrade(modifierGroupUpgrade, id)
    response.setResponse(savedModifierGroupUpgrade, ['ModifierGroupUpgrade updated successfully'], false)
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
    const deletedModifierGroupUpgrade = await modifierGroupUpgradeService.deleteModifierGroupUpgrade(id)
    response.setResponse(deletedModifierGroupUpgrade, ['ModifierGroupUpgrade deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
