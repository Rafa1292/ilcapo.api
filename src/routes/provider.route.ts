/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as providerService from '../services/provider/provider.service'
import * as providerFactory from '../factories/provider.factory'
import * as responseFactory from '../factories/response.factory'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    response.setResponse(await providerService.getProviders(), 'Providers retrieved successfully', false)
  } catch (error) {
    response.setResponse([], 'Providers could not be retrieved', true)
  }
  res.send(response)
})

router.get('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const provider = await providerService.getProviderById(id)
    if (provider !== undefined) {
      response.setResponse(provider, 'Provider retrieved successfully', false)
    }
  } catch (error) {
    response.setResponse(undefined, 'Provider could not be retrieved', true)
  }
  res.json(response)
})

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const { id, ...createProvider } = providerFactory.toNewProvider(req.body)
    const savedProvider = await providerService.saveProvider(createProvider)
    response.setResponse(savedProvider, 'Provider saved successfully', false)
  } catch (error: any) {
    console.log(error)
    response.setResponse(undefined, error.message, true)
  }
  res.json(response)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
    const provider = providerFactory.toNewProvider(req.body)
    const savedProvider = await providerService.updateProvider(provider, id)
    response.setResponse(savedProvider, 'Provider updated successfully', false)
  } catch (error) {
    response.setResponse(undefined, 'Provider could not be updated', true)
  }
  res.json(response)
})

export default router
