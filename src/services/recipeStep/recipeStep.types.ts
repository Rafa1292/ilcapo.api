import { RecipeStepIngredient } from '../recipeStepIngredient/recipeStepIngredient.type'

export interface RecipeStepAttributes {
  id: number
  recipeId: number
  description: string
  stepNumber: number
  cost: number
  minutesOfPreparation: number
  recipeStepIngredients?: RecipeStepIngredient[]
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface RecipeStep extends Required<RecipeStepAttributes> { }

export interface NewRecipeStep extends Omit<RecipeStepAttributes, 'id'> { }
