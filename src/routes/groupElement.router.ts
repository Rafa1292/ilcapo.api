/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as groupElementService from '../services/groupElement/groupElement.service'
import * as groupElementFactory from '../factories/groupElement.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const { id, ...createGroupElement } = await groupElementFactory.toNewGroupElement(req.body)
    const savedGroupElement = await groupElementService.saveGroupElement(createGroupElement)
    response.setResponse(savedGroupElement, ['groupElement saved successfully'], false)
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
    const groupElement = await groupElementFactory.toNewGroupElement(req.body)
    const savedGroupElement = await groupElementService.updateGroupElement(groupElement, id)
    response.setResponse(savedGroupElement, ['GroupElement updated successfully'], false)
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
    await groupElementService.deleteGroupElement(id)
    response.setResponse({}, ['GroupElement deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
