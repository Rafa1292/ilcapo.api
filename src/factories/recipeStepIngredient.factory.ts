import { z } from 'zod'
import { RecipeStepIngredient } from '../services/recipeStepIngredient/recipeStepIngredient.type'
import { measureSchema } from './measure.factory'
import { ingredientSchema } from './ingredient.factory'

export const recipeStepIngredientSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  quantity: z.number({
    required_error: 'La cantidad es requerida',
    invalid_type_error: 'La cantidad debe ser un numero',
  }),
  ingredientId: z.number({
    required_error: 'El ingrediente es requerido',
    invalid_type_error: 'El ingrediente debe ser un numero entero',
  }),
  recipeStepId: z.number({
    required_error: 'El paso de la receta es requerido',
    invalid_type_error: 'El paso de la receta debe ser un numero entero',
  }),
  measureId: z.number({
    required_error: 'La medida es requerida',
    invalid_type_error: 'La medida debe ser un numero entero',
  }),
  extra: z.boolean({
    required_error: 'El extra es requerido',
    invalid_type_error: 'El extra debe ser un texto',
  }),
  isOptional: z.boolean({
    required_error: 'El opcional es requerido',
    invalid_type_error: 'El opcional debe ser un texto',
  }),
  measure: z.union([z.undefined(), measureSchema]),
  ingredient: z.union([z.undefined(), ingredientSchema]),
})

export const validateRecipeStepIngredient = async (recipeStepIngredient: any): Promise<RecipeStepIngredient> => {
  const result = await recipeStepIngredientSchema.safeParseAsync(recipeStepIngredient)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialRecipeStepIngredient = async (recipeStepIngredient: any): Promise<Partial<RecipeStepIngredient>> => {
  const result = await recipeStepIngredientSchema.partial().safeParseAsync(recipeStepIngredient)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateRecipeStepIngredients = async (recipeStepIngredients: any[]): Promise<RecipeStepIngredient[]> => {
  return await Promise.all(
    recipeStepIngredients.map(async (recipeStepIngredient) => {
      return await validateRecipeStepIngredient(recipeStepIngredient)
    })
  )
}
