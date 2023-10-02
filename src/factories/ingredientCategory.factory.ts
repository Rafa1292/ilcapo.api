import { z } from 'zod'
import { IngredientCategory } from '../services/ingredientCategory/ingredientCategory.types'
import { getIngredientCategoryByName } from '../services/ingredientCategory/ingredientCategory.service'
import { ingredientSchema } from './ingredient.factory'


const ingredientCategorySchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  name: z.string({
    required_error: 'El nombre de la marca es requerido',
    invalid_type_error: 'El nombre de la marca debe ser  un texto',
  }),
  ingredients: z.union([ z.undefined(), z.array(ingredientSchema) ])
})

export const validateIngredientCategory = async (ingredientCategory: any): Promise<IngredientCategory> => {
  const result = await ingredientCategorySchema.safeParseAsync(ingredientCategory)

  if (!result.success) throw new Error(result.error.message)
  await validateName(result.data.name, result.data.id)
  return result.data
}

export const validatePartialIngredientCategory = async (ingredientCategory: any): Promise<Partial<IngredientCategory>> => {
  const result = await ingredientCategorySchema.partial().safeParseAsync(ingredientCategory)

  if (!result.success) throw new Error(result.error.message)

  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getIngredientCategoryByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}

export const validateIngredientCategories = async (ingredientCategories: any[]): Promise<IngredientCategory[]> => {
  return await Promise.all(ingredientCategories.map(async (category: any) => await validateIngredientCategory(category)))
}