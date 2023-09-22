import { z } from 'zod'
import { RecipeStep } from '../services/recipeStep/recipeStep.types'
import * as recipeStepValidator from '../validations/recipeStep.validator'
import { recipeStepIngredientSchema } from './recipeStepIngredient.factory'

export const recipeStepSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  stepNumber: z.number({
    required_error: 'El numero de paso es requerido',
    invalid_type_error: 'El numero de paso debe ser un numero entero',
  }),
  description: z.string({
    required_error: 'La descripcion es requerida',
    invalid_type_error: 'La descripcion debe ser un texto',
  }),
  cost: z.number({
    required_error: 'El costo es requerido',
    invalid_type_error: 'El costo debe ser un numero',
  }),
  minutesOfPreparation: z.number({
    required_error: 'Los minutos de preparacion son requeridos',
    invalid_type_error: 'Los minutos de preparacion deben ser un numero',
  }),
  recipeId: z.number({
    required_error: 'La receta es requerida',
    invalid_type_error: 'La receta debe ser un numero entero',
  }),
  recipeStepIngredients: z.array(recipeStepIngredientSchema)
})

export const validateRecipeStep = async (recipeStep: any): Promise<RecipeStep> => {
  const result = await recipeStepSchema.safeParseAsync(recipeStep)
  await recipeStepValidator.newRecipeStepIsValid()

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialRecipeStep = async (recipeStep: any): Promise<Partial<RecipeStep>> => {
  const result = await recipeStepSchema.partial().safeParseAsync(recipeStep)
  await recipeStepValidator.newRecipeStepIsValid()

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateRecipeSteps = async (recipeSteps: any[]): Promise<RecipeStep[]> => {
  return await Promise.all(
    recipeSteps.map(async (recipeStep) => {
      return await validateRecipeStep(recipeStep)
    })
  )
}
