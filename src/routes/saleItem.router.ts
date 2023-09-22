/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as saleItemService from '../services/saleItem/saleItem.service'
import * as saleItemFactory from '../factories/saleItem.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'
import { SaleItem } from '../services/saleItem/saleItem.types'
import { ItemPrice } from '../services/itemPrice/itemPrice.types'
import { validatePrices } from '../validations/saleItem.validator'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    response.setResponse(await saleItemService.getSaleItems(), ['SaleItems retrieved successfully'], false)
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
    const saleItem = await saleItemService.getSaleItemById(id)
    if (saleItem !== undefined) {
      response.setResponse(saleItem, ['SaleItem retrieved successfully'], false)
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
    const { id, ...createSaleItem } = await saleItemFactory.validateSaleItem(req.body)
    const savedSaleItem = await saleItemService.saveSaleItem(createSaleItem)
    response.setResponse(savedSaleItem, ['SaleItem saved successfully'], false)
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
    const prices = req.body.prices as ItemPrice[]
    validatePrices(prices)
    const saleItem = await saleItemFactory.validateSaleItem({...req.body, prices} as SaleItem)
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
    const deletedSaleItem = await saleItemService.deleteSaleItem(id)
    response.setResponse(deletedSaleItem, ['SaleItem deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
