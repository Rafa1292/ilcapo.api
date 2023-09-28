/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as modifierElementService from '../services/modifierElement/modifierElement.service'
import * as productReferenceService from '../services/productReference/productReference.service'
import * as modifierElementFactory from '../factories/modifierElement.factory'
import * as productReferenceFactory from '../factories/productReference.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const modifierElementModels = await modifierElementService.getModifierElements()
    const modifierElements = await modifierElementFactory.validateModifierElements(modifierElementModels)
    response.setResponse(modifierElements, ['ModifierElements retrieved successfully'], false)
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
    await modifierElementService.recoveryModifierElement(id)
    response.setResponse({}, ['Modifier element recovery successfully'], false)
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
    const modifierElementModel = await modifierElementService.getModifierElementById(id)
    const modifierElement = await modifierElementFactory.validateModifierElement(modifierElementModel)
    response.setResponse(modifierElement, ['ModifierElement retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const createModifierElement = await modifierElementFactory.validateModifierElement(req.body)
    const savedModifierElement = await modifierElementService.saveModifierElement(createModifierElement)
    if (createModifierElement.productReference !== undefined && createModifierElement.productReference.id === 0) {
      const productReference = await productReferenceFactory.validateProductReference({
        ...createModifierElement.productReference,
        modifierElementId: savedModifierElement.id,
      })

      await productReferenceService.saveProductReference(productReference)
    }
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
    const modifierElement = await modifierElementFactory.validatePartialModifierElement({ ...req.body, id })
    const savedModifierElement = await modifierElementService.updateModifierElement(modifierElement, id)
    if (modifierElement.productReference !== undefined) {
      if (modifierElement.productReference?.id === 0) {
        const createProductReference = modifierElement.productReference
        const productReference = await productReferenceFactory.validateProductReference({
          ...createProductReference,
          modifierElementId: id,
        })
        await productReferenceService.saveProductReference(productReference)
      } else {
        await productReferenceService.updateProductReference(
          modifierElement.productReference,
          modifierElement.productReference?.id
        )
      }
    } else {
      await productReferenceService.deleteProductReference(id)
    }
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
    await modifierElementService.deleteModifierElement(id)
    response.setResponse({}, ['ModifierElement deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
