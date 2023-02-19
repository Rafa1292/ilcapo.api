import { RecipeStepIngredientModel } from '../../db/models/recipeStepIngredient.model'
import { NewRecipeStepIngredient, RecipeStepIngredient } from './recipeStepIngredient.type'

export const saveRecipeStepIngredient = async (recipeStepIngredient: NewRecipeStepIngredient): Promise<RecipeStepIngredient> => {
  return await RecipeStepIngredientModel.create(recipeStepIngredient)
}

export const updateRecipeStepIngredient = async (recipeStepIngredient: Partial<RecipeStepIngredient>, id: number): Promise<void> => {
  await RecipeStepIngredientModel.update(recipeStepIngredient, { where: { id } })
}

export const deleteRecipeStepIngredient = async (id: number): Promise<void> => {
  await RecipeStepIngredientModel.destroy({ where: { id } })
}

export const saveRecipeStepIngredients = async (recipeStepIngredients: RecipeStepIngredient[], recipeStepId: number): Promise<void> => {
  for (const recipeStepIngredient of recipeStepIngredients) {
    const { id, ...rest } = recipeStepIngredient
    await saveRecipeStepIngredient({ ...rest, recipeStepId })
  }
}
