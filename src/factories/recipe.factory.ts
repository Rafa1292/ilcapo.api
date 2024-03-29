import { z } from 'zod'
import { Recipe } from '../services/recipe/recipe.types'
import { recipeStepSchema } from './recipeStep.factory'
import { getRecipeByName } from '../services/recipe/recipe.service'

const recipeSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto',
  }),
  cost: z.number({
    required_error: 'El costo es requerido',
    invalid_type_error: 'El costo debe ser un numero',
  }),
  recipeSteps: z.union([z.array(recipeStepSchema), z.undefined()]),

})

const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getRecipeByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}

export const validateRecipe = async (recipe: any): Promise<Recipe> => {
  const result = await recipeSchema.safeParseAsync(recipe)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  await validateName(result.data.name, result.data.id)

  return result.data
}

export const validatePartialRecipe = async (recipe: any): Promise<Partial<Recipe>> => {
  const result = await recipeSchema.partial().safeParseAsync(recipe)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateRecipes = async (recipes: any[]): Promise<Recipe[]> => {
  return await Promise.all(recipes.map(async (recipe: any) => await validateRecipe(recipe)))
}
