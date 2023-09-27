import { z } from 'zod'
import { InputCategory } from '../services/inputCategory/inputCategory.types'
import { getInputCategoryByName } from '../services/inputCategory/inputCategory.service'

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

  if (!result.success) {
    throw new Error(result.error.message)
  }
  await validateName(result.data.name, result.data.id)
  
  return result.data
}

export const validatePartialInputCategory = async (inputCategory: any): Promise<Partial<InputCategory>> => {
  const result = await inputCategorySchema.partial().safeParseAsync(inputCategory)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateInputCategories = async (inputCategories: any[]): Promise<InputCategory[]> => {
  return await Promise.all(inputCategories.map(async (inputCategory) => await validateInputCategory(inputCategory)))
}


const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getInputCategoryByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}