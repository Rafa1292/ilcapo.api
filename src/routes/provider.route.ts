/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as providerService from '../services/provider/provider.service'
import * as providerFactory from '../factories/provider.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    response.setResponse(await providerService.getProviders(), ['Providers retrieved successfully'], false)
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
    const provider = await providerService.getProviderById(id)
    if (provider !== undefined) {
      response.setResponse(provider, ['Provider retrieved successfully'], false)
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
    const { id, ...createProvider } = await providerFactory.toNewProvider(req.body)
    const savedProvider = await providerService.saveProvider(createProvider)
    response.setResponse(savedProvider, ['Provider saved successfully'], false)
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
    const provider = await providerFactory.toNewProvider(req.body)
    const savedProvider = await providerService.updateProvider(provider, id)
    response.setResponse(savedProvider, ['Provider updated successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
