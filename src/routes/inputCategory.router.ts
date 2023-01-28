/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import * as inputCategoryService from '../services/inputCategory/inputCategory.service'
import * as inputCategoryFactory from '../factories/inputCategory.factory'
import * as responseFactory from '../factories/response.factory'
import { errorHandler } from '../utils/errorHandler'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    response.setResponse(await inputCategoryService.getInputCategories(), ['Input categories retrieved successfully'], false)
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
    const inputCategory = await inputCategoryService.getInputCategoryById(id)
    if (inputCategory !== undefined) {
      response.setResponse(inputCategory, ['Input category retrieved successfully'], false)
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
    const { id, ...createInputCategory } = await inputCategoryFactory.toNewInputCategory(req.body)
    const savedInputCategory = await inputCategoryService.saveInputCategory(createInputCategory)
    response.setResponse(savedInputCategory, ['Input category saved successfully'], false)
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
    const inputCategory = await inputCategoryFactory.toNewInputCategory(req.body)
    const savedInputCategory = await inputCategoryService.updateInputCategory(inputCategory, id)
    response.setResponse(savedInputCategory, ['Input category updated successfully'], false)
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
    const deletedInputCategory = await inputCategoryService.deleteInputCategory(id)
    response.setResponse(deletedInputCategory, ['Input category deleted successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

export default router
