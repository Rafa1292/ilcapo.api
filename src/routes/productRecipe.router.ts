/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as productRecipeService from '../services/productRecipe/productRecipe.service'
import * as productRecipeFactory from '../factories/productRecipe.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const { id, ...createProductRecipe } = await productRecipeFactory.validateProductRecipe(req.body)
    const savedProductRecipe = await productRecipeService.saveProductRecipe(createProductRecipe)
    response.setResponse(savedProductRecipe, ['ProductRecipe saved successfully'], false)
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
    const productRecipe = await productRecipeFactory.validateProductRecipe(req.body)
    const savedProductRecipe = await productRecipeService.updateProductRecipe(productRecipe, id)
    response.setResponse(savedProductRecipe, ['ProductRecipe updated successfully'], false)
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
    await productRecipeService.deleteProductRecipe(id)
    response.setResponse({}, ['ProductRecipe deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/:productId/:modifierElementId', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const productId = parseInt(req.params.productId)
    const modifierElementId = parseInt(req.params.modifierElementId)
    const productRecipe = await productRecipeService.findProductRecipe(productId, modifierElementId)
    if (productRecipe !== undefined) {
      response.setResponse(productRecipe, ['ProductRecipe retrieved successfully'], false)
    }
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
