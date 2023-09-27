import { z } from 'zod'
import { InputCategory } from '../services/inputCategory/inputCategory.types'
import * as inputCategoryValidator from '../validations/inputCategory.validator'

const inputCategorySchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  name: z.string({
    required_error: 'El nombre de la categoria es requerido',
    invalid_type_error: 'El nombre de la categoria debe ser  un texto',
  }),
})

export const validateInputCategory = async (inputCategory: any): Promise<InputCategory> => {
  const result = await inputCategorySchema.safeParseAsync(inputCategory)
  await inputCategoryValidator.newInputCategoryIsValid(inputCategory)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialInputCategory = async (inputCategory: any): Promise<Partial<InputCategory>> => {
  const result = await inputCategorySchema.partial().safeParseAsync(inputCategory)
  await inputCategoryValidator.newInputCategoryIsValid(inputCategory)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateInputCategories = async (inputCategories: any[]): Promise<InputCategory[]> => {
  return await Promise.all(inputCategories.map(async (inputCategory) => await validateInputCategory(inputCategory)))
}
