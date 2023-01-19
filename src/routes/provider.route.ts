/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as providerService from '../services/provider.service'
import * as providerFactory from '../factories/provider.factory'

const router = express.Router()

router.get('/', (_req: Request, res: Response) => {
  res.send(providerService.getProvidersVM())
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10)
    const provider = await providerService.getProviderById(id)
    if (provider !== undefined) {
      res.json(provider)
    } else {
      res.status(404).send('Provider not found')
    }
  } catch (error) {
    res.status(400).send('Invalid provider id')
  }
})

router.post('/', (req: Request, res: Response) => {
  const provider = providerFactory.toNewProvider(req.body)
  const savedProvider = providerService.saveProvider(provider)
  res.json(savedProvider)
})

export default router
