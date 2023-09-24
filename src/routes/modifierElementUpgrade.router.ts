/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as modifierElementUpgradeService from '../services/modifierElementUpgrade/modifierElementUpgrade.service'
import * as modifierElementUpgradeFactory from '../factories/modifierElementUpgrade.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.patch('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const modifierElementUpgrade = await modifierElementUpgradeFactory.validatePartialModifierElementUpgrade(req.body)
    const savedModifierElementUpgrade = await modifierElementUpgradeService.updateModifierElementUpgrade(modifierElementUpgrade, id)
    response.setResponse(savedModifierElementUpgrade, ['ModifierGroupUpgrade updated successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/elementUpgrade/:modifierElementId', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const modifierElementId = parseInt(_req.params.modifierElementId)
    const modifierElementUpgradeModel = await modifierElementUpgradeService.getModifierElementUpgradeByModifierElementId(modifierElementId)
    const modifierElementUpgrade = modifierElementUpgradeFactory.validateModifierElementUpgrade(modifierElementUpgradeModel)
    response.setResponse(modifierElementUpgrade, ['ModifierElementUpgrade retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
