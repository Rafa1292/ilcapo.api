/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as providerService from '../services/provider.service'
import * as providerFactory from '../factories/provider.factory'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  res.send(await providerService.getProvidersVM())
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

router.post('/', async (req: Request, res: Response) => {
  const provider = providerFactory.toNewProviderVM(req.body)
  const savedProvider = await providerService.saveProvider(provider)
  res.json(savedProvider)
})

router.patch('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const provider = providerFactory.toNewProviderVM(req.body)
  const savedProvider = await providerService.updateProvider(provider, id)
  res.json(savedProvider)
})

export default router
