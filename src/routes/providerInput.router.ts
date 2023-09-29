/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as providerInputService from '../services/providerInput/providerInput.service'
import * as providerInputFactory from '../factories/providerInput.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/providerInputsByInputId/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const providerInputModels = await providerInputService.getProviderInputsByInputId(id)
    const providerInputs = await providerInputFactory.validateProviderInputs(providerInputModels)
    response.setResponse(providerInputs, ['Provider inputs retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get('/providerInputsByProviderId/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const providerInputModels = await providerInputService.getProviderInputsByProviderId(id)
    const providerInputs = await providerInputFactory.validateProviderInputs(providerInputModels)
    response.setResponse(providerInputs, ['Provider inputs retrieved successfully'], false)
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
    const providerInputModel = await providerInputService.getProviderInputById(id)
    const providerInput = await providerInputFactory.validateProviderInput(providerInputModel)
    response.setResponse(providerInput, ['Provider input retrieved successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const createProviderInput = await providerInputFactory.validateProviderInput(req.body)
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
    const providerInput = await providerInputFactory.validatePartialProviderInput({...req.body, id})
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
    await providerInputService.deleteProviderInput(id)
    response.setResponse({}, ['Provider input deleted successfully'], false)
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
     await providerInputService.recoveryProviderInput(id)
    response.setResponse({}, ['ProviderInput recovery successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})


export default router
