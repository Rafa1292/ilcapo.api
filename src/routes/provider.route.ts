import express, { Request, Response } from 'express'
import * as providerService from '../services/provider.service'
import * as providerFactory from '../factories/provider.factory'

const router = express.Router()

router.get('/', (_req: Request, res: Response) => {
  res.send(providerService.getProvidersVM())
})

router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const provider = providerService.getProviderById(id)
  if (provider !== undefined) {
    res.send(provider)
  } else {
    res.status(404).end()
  }
})

router.post('/', (req: Request, res: Response) => {
  const provider = providerFactory.toNewProvider(req.body)
  const savedProvider = providerService.saveProvider(provider)
  res.json(savedProvider)
})

export default router
