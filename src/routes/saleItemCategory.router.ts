/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as saleItemCategoryService from '../services/saleItemCategory/saleItemCategory.service'
import * as saleItemCategoryFactory from '../factories/saleItemCategory.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    response.setResponse(await saleItemCategoryService.getSaleItemCategories(), ['SaleItem categories retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse([], errors, true)
  }
  res.send(response)
})

router.get('/activeProducts', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    response.setResponse(await saleItemCategoryService.getSaleItemCategoriesWithActiveProducts(), ['SaleItem categories retrieved successfully'], false)
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
    const saleItemCategory = await saleItemCategoryService.getSaleItemCategoryById(id)
    if (saleItemCategory !== undefined) {
      response.setResponse(saleItemCategory, ['SaleItem category retrieved successfully'], false)
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
    const { id, ...createSaleItemCategory } = await saleItemCategoryFactory.toNewSaleItemCategory(req.body)
    const savedSaleItemCategory = await saleItemCategoryService.saveSaleItemCategory(createSaleItemCategory)
    response.setResponse(savedSaleItemCategory, ['SaleItem category saved successfully'], false)
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
    const saleItemCategory = await saleItemCategoryFactory.toNewSaleItemCategory(req.body)
    const savedSaleItemCategory = await saleItemCategoryService.updateSaleItemCategory(saleItemCategory, id)
    response.setResponse(savedSaleItemCategory, ['SaleItem category updated successfully'], false)
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
    const deletedSaleItemCategory = await saleItemCategoryService.deleteSaleItemCategory(id)
    response.setResponse(deletedSaleItemCategory, ['SaleItem category deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
