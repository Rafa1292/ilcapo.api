/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as saleItemProductService from '../services/saleItemProduct/saleItemProduct.service'
import * as saleItemProductFactory from '../factories/saleItemProduct.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const createSaleItemProduct = await saleItemProductFactory.validateSaleItemProduct(req.body)
    const savedSaleItemProduct = await saleItemProductService.saveSaleItemProduct(createSaleItemProduct)
    response.setResponse(savedSaleItemProduct, ['SaleItem Product saved successfully'], false)
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
    const saleItemProduct = await saleItemProductFactory.validatePartialSaleItemProduct(req.body)
    const savedSaleItemProduct = await saleItemProductService.updateSaleItemProduct(saleItemProduct, id)
    response.setResponse(savedSaleItemProduct, ['SaleItem Product updated successfully'], false)
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
    await saleItemProductService.deleteSaleItemProduct(id)
    response.setResponse({}, ['SaleItem Product deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
