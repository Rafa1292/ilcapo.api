export interface RecipeStepIngredientAttributes {
  id: number
  recipeStepId: number
  ingredientId: number
  quantity: number
  measureId: number
  extra: boolean
  isOptional: boolean
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface RecipeStepIngredient extends Required<RecipeStepIngredientAttributes> { }

export interface NewRecipeStepIngredient extends Omit<RecipeStepIngredientAttributes, 'id'> { }
