/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as modifierElementService from '../services/modifierElement/modifierElement.service'
import * as productReferenceService from '../services/productReference/productReference.service'
import * as modifierElementFactory from '../factories/modifierElement.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'
import { NewProductReference, ProductReference } from '../services/productReference/productReference.types'

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

router.post('/:modifierGroupId', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const { id, ...createModifierElement } = await modifierElementFactory.validateModifierElement(req.body)
    if (id > 0) {
      response.setResponse(undefined, ['ModifierElement already exists and was recovery'], false)
    } else {
      const savedModifierElement = await modifierElementService.saveModifierElement(createModifierElement)
      if (createModifierElement.productReference !== undefined && createModifierElement.productReference.id === 0) {
        const productReference: ProductReference = {
          ...createModifierElement.productReference,
          modifierElementId: savedModifierElement.id
        }
        const { id, ...newProductReference } = productReference
        await productReferenceService.saveProductReference(newProductReference)
      }
      response.setResponse(savedModifierElement, ['ModifierElement saved successfully'], false)
    }
  } catch (error: any) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.patch('/:id/:modifierGroupId', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const elementId = parseInt(req.params.id)
    const modifierElement = await modifierElementFactory.validateModifierElement(req.body)
    const savedModifierElement = await modifierElementService.updateModifierElement(modifierElement, elementId)

    if (modifierElement.productReference !== undefined) {
      console.log('---------------inProductReference----------------------------')
      if (modifierElement.productReference?.id === 0) {
        const { id, ...createProductReference } = modifierElement.productReference
        const productReference: NewProductReference = {
          ...createProductReference,
          modifierElementId: elementId
        }
        console.log('---------------saveProductReference----------------------------')
        await productReferenceService.saveProductReference(productReference)
      } else {
        console.log('---------------updateProductReference----------------------------')
        await productReferenceService.updateProductReference(modifierElement.productReference, modifierElement.productReference?.id)
      }
    } else {
      console.log('---------------deleteProductReference----------------------------')
      // delete prduct reference by modifierElementId
      await productReferenceService.deleteProductReference(elementId)
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
    const deletedModifierElement = await modifierElementService.deleteModifierElement(id)
    response.setResponse(deletedModifierElement, ['ModifierElement deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
