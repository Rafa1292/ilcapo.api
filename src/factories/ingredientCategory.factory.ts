import { z } from 'zod'
import { IngredientCategory } from '../services/ingredientCategory/ingredientCategory.types'
import * as ingredientCategoryValidator from '../validations/ingredientCategory.validator'


const ingredientCategorySchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre de la marca es requerido',
    invalid_type_error: 'El nombre de la marca debe ser  un texto',
  })
})

export const validateIngredientCategory = async (ingredientCategory: any): Promise<IngredientCategory> => {
  const result = await ingredientCategorySchema.safeParseAsync(ingredientCategory)
  await ingredientCategoryValidator.newIngredientCategoryIsValid(ingredientCategory)

  if (!result.success) throw new Error(result.error.message)

  return result.data
}

export const validatePartialIngredientCategory = async (ingredientCategory: any): Promise<Partial<IngredientCategory>> => {
  const result = await ingredientCategorySchema.partial().safeParseAsync(ingredientCategory)
  await ingredientCategoryValidator.newIngredientCategoryIsValid(ingredientCategory)

  if (!result.success) throw new Error(result.error.message)

  return result.data
}


export const validateIngredientCategories = async (ingredientCategories: any[]): Promise<IngredientCategory[]> => {
  return await Promise.all(ingredientCategories.map(async (category: any) => await validateIngredientCategory(category)))
}