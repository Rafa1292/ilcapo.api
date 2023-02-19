import { RecipeStepIngredient } from '../services/recipeStepIngredient/recipeStepIngredient.type'

export const toNewRecipeStepIngredient = async (recipeStepIngredient: any): Promise<RecipeStepIngredient> => {
  return {
    id: recipeStepIngredient.id,
    quantity: recipeStepIngredient.quantity,
    ingredientId: recipeStepIngredient.ingredientId,
    recipeStepId: recipeStepIngredient.recipeStepId,
    measureId: recipeStepIngredient.measureId,
    extra: recipeStepIngredient.extra,
    isOptional: recipeStepIngredient.isOptional,
    createdBy: recipeStepIngredient.createdBy,
    updatedBy: recipeStepIngredient.updatedBy,
    createdAt: recipeStepIngredient.createdAt,
    updatedAt: recipeStepIngredient.updatedAt,
    delete: recipeStepIngredient.delete
  }
}
