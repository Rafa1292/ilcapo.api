import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface RecipeStepIngredientAttributes {
  id: number
  recipeStepId: number
  ingredientId: number
  quantity: number
  measureId: number
  extra: boolean
  isOptional: boolean
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface RecipeStepIngredient extends Omit<RecipeStepIngredientAttributes, keyof typeof traceFields> { }
