import { z } from 'zod'
import { Recipe } from '../services/recipe/recipe.types'
import * as recipeValidator from '../validations/recipe.validator'
import { recipeStepSchema } from './recipeStep.factory'

const recipeSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto',
  }),
  cost: z.number({
    required_error: 'El costo es requerido',
    invalid_type_error: 'El costo debe ser un numero',
  }),
  recipeSteps: z.array(recipeStepSchema)

})

export const validateRecipe = async (recipe: any): Promise<Recipe> => {
  const result = await recipeSchema.safeParseAsync(recipe)
  await recipeValidator.newRecipeIsValid(recipe)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialRecipe = async (recipe: any): Promise<Partial<Recipe>> => {
  const result = await recipeSchema.partial().safeParseAsync(recipe)
  await recipeValidator.newRecipeIsValid(recipe)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateRecipes = async (recipes: any[]): Promise<Recipe[]> => {
  return await Promise.all(recipes.map(async (recipe: any) => await validateRecipe(recipe)))
}
