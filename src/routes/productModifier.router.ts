/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as productModifierService from '../services/productModifier/productModifier.service'
import * as productModifierFactory from '../factories/productModifier.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const { id, ...createProductModifier } = await productModifierFactory.toNewProductModifier(req.body)
    const savedProductModifiercreateProductModifier = await productModifierService.saveProductModifier(createProductModifier)
    response.setResponse(savedProductModifiercreateProductModifier, ['ProductModifier saved successfully'], false)
  } catch (error: any) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/byProductId/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const productModifiers = await productModifierService.getProductModifiersByProductId(parseInt(req.params.id))
    response.setResponse(productModifiers, ['Product modifier retrieved successfully'], false)
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
    const productModifier = await productModifierFactory.toNewProductModifier(req.body)
    const savedProductModifier = await productModifierService.updateProductModifier(productModifier, id)
    response.setResponse(savedProductModifier, ['ProductModifier updated successfully'], false)
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
    await productModifierService.deleteProductModifier(id)
    response.setResponse({}, ['ProductModifier deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/upProductModifierOrder/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    await productModifierService.upProductModifierOrder(id)
    response.setResponse({}, ['ProductModifier order updated successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/downProductModifierOrder/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    await productModifierService.downProductModifierOrder(id)
    response.setResponse({}, ['ProductModifier order updated successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
