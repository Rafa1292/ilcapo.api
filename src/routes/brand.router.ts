/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as brandService from '../services/brand/brand.service'
import * as brandFactory from '../factories/brand.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const brandModels = await brandService.getBrands()
    const brands = await brandFactory.validateBrands(brandModels)
    response.setResponse(brands, ['Brands retrieved successfully'], false)
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
     await brandService.recoveryBrand(id)
    response.setResponse({}, ['Brand recovery successfully'], false)
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
    const brandModel = await brandService.getBrandById(id)
    if (brandModel !== undefined) {
      const brand = await brandFactory.validateBrand(brandModel)
      response.setResponse(brand, ['Brand retrieved successfully'], false)
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
    const createBrand = await brandFactory.validateBrand(req.body)
    const savedBrand = await brandService.saveBrand(createBrand)
    response.setResponse(savedBrand, ['Brand saved successfully'], false)
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
    const brand = await brandFactory.validatePartialBrand(req.body)
    await brandService.updateBrand(brand, id)
    response.setResponse({}, ['Brand updated successfully'], false)
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
    await brandService.deleteBrand(id)
    response.setResponse({}, ['Brand deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})


export default router
