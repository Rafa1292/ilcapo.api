/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as providerInputService from '../services/providerInput/providerInput.service'
import * as providerInputFactory from '../factories/providerInput.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

// export const updateProviderInput = async (providerInput: Partial<ProviderInput>, id: number): Promise<ProviderInput> =>

// export const deleteProviderInput = async (id: number): Promise<ProviderInput> =>

// export const recoveryProviderInput = async (id: number): Promise<ProviderInput> =>

// export const getProviderInputByProviderIdAndInputId = async (providerId: number, inputId: number): Promise<ProviderInput | null> =>

router.get('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const providerInput = await providerInputService.getProviderInputById(id)
    if (providerInput !== undefined) {
      if (providerInput.delete) {
        response.setResponse(undefined, ['Provider input deleted'], false)
      } else {
        response.setResponse(providerInput, ['Provider input retrieved successfully'], false)
      }
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
    const { id, ...createProviderInput } = await providerInputFactory.toNewProviderInput(req.body)
    const savedProviderInput = await providerInputService.saveProviderInput(createProviderInput)
    response.setResponse(savedProviderInput, ['Provider input saved successfully'], false)
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
    const providerInput = await providerInputFactory.toNewProviderInput(req.body)
    const savedProviderInput = await providerInputService.updateProviderInput(providerInput, id)
    response.setResponse(savedProviderInput, ['Provider input updated successfully'], false)
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
    const deletedProviderInput = await providerInputService.deleteProviderInput(id)
    response.setResponse(deletedProviderInput, ['Provider input deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
