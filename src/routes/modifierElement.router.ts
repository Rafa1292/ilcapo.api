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
    const modifierElementModels =
      await modifierElementService.getModifierElements()
    const modifierElements = modifierElementFactory.validateModifierElements(
      modifierElementModels
    )
    response.setResponse(
      modifierElements,
      ['ModifierElements retrieved successfully'],
      false
    )
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
    const modifierElementModel =
      await modifierElementService.getModifierElementById(id)
    const modifierElement =
      modifierElementFactory.validateModifierElement(modifierElementModel)
    response.setResponse(
      modifierElement,
      ['ModifierElement retrieved successfully'],
      false
    )
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.post('/:modifierGroupId', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.modifierGroupId)
    const createModifierElement =
      await modifierElementFactory.validateModifierElement(req.body)
    if (id > 0) {
      response.setResponse(
        undefined,
        ['ModifierElement already exists and was recovery'],
        false
      )
    } else {
      const savedModifierElement =
        await modifierElementService.saveModifierElement(createModifierElement)
      if (
        createModifierElement.productReference !== undefined &&
        createModifierElement.productReference.id === 0
      ) {
        const productReference =
          await productReferenceFactory.validateProductReference({
            ...createModifierElement.productReference,
            modifierElementId: savedModifierElement.id,
          })

        await productReferenceService.saveProductReference(productReference)
      }
      response.setResponse(
        savedModifierElement,
        ['ModifierElement saved successfully'],
        false
      )
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
    const modifierElement =
      await modifierElementFactory.validatePartialModifierElement(req.body)
    const savedModifierElement =
      await modifierElementService.updateModifierElement(
        modifierElement,
        elementId
      )
    if (modifierElement.productReference !== undefined) {
      if (modifierElement.productReference?.id === 0) {
        const createProductReference = modifierElement.productReference
        const productReference =
          await productReferenceFactory.validateProductReference({
            ...createProductReference,
            modifierElementId: elementId,
          })
        await productReferenceService.saveProductReference(productReference)
      } else {
        await productReferenceService.updateProductReference(
          modifierElement.productReference,
          modifierElement.productReference?.id
        )
      }
    } else {
      await productReferenceService.deleteProductReference(elementId)
    }
    response.setResponse(
      savedModifierElement,
      ['ModifierElement updated successfully'],
      false
    )
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
