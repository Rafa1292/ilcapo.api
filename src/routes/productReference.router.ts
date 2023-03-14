/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as productReferenceService from '../services/productReference/productReference.service'
import * as productReferenceFactory from '../factories/productReference.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.patch('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const productReference = await productReferenceFactory.toNewProductReference(req.body)
    const savedProductReference = await productReferenceService.updateProductReference(productReference, id)
    response.setResponse(savedProductReference, ['ProductReference updated successfully'], false)
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
    await productReferenceService.deleteProductReference(id)
    response.setResponse(undefined, ['ProductReference deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
