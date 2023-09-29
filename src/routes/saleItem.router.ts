/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as saleItemService from '../services/saleItem/saleItem.service'
import * as saleItemFactory from '../factories/saleItem.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'
import { ItemPrice } from '../services/itemPrice/itemPrice.types'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const createSaleItem = await saleItemFactory.validateSaleItem(req.body)
    const savedSaleItem = await saleItemService.saveSaleItem(createSaleItem)
    response.setResponse(savedSaleItem, ['SaleItem saved successfully'], false)
  } catch (error: any) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const saleItemModels = await saleItemService.getSaleItems()
    const saleItems = await saleItemFactory.validateSaleItems(saleItemModels)
    response.setResponse(saleItems, ['SaleItems retrieved successfully'], false)
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
    const saleItemModel = await saleItemService.getSaleItemById(id)
    const saleItem = await saleItemFactory.validateSaleItem(saleItemModel)
    response.setResponse(saleItem, ['SaleItem retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const prices = req.body.prices as ItemPrice[]
    const saleItem = await saleItemFactory.validatePartialSaleItem({ ...req.body, prices })
    const savedSaleItem = await saleItemService.updateSaleItem(saleItem, id)
    response.setResponse(savedSaleItem, ['SaleItem updated successfully'], false)
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
    await saleItemService.deleteSaleItem(id)
    response.setResponse({}, ['SaleItem deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.patch('/recovery/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
     await saleItemService.recoverySaleItem(id)
    response.setResponse({}, ['Sale Item recovery successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
