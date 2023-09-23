import { RecipeStepIngredientModel } from '../../db/models/recipeStepIngredient.model'
import { RecipeStepIngredient } from './recipeStepIngredient.type'

export const saveRecipeStepIngredient = async (recipeStepIngredient: RecipeStepIngredient): Promise<RecipeStepIngredient> => {
  const { id, ...rest } = RecipeStepIngredientModel.getRecipeStepIngredient(recipeStepIngredient,0)
  return await RecipeStepIngredientModel.create(rest)
}

export const updateRecipeStepIngredient = async (recipeStepIngredient: Partial<RecipeStepIngredient>, id: number): Promise<void> => {
  const updateRecipeStepIngredient = await RecipeStepIngredientModel.getPartialRecipeStepIngredient(recipeStepIngredient, 0)
  await RecipeStepIngredientModel.update(updateRecipeStepIngredient, { where: { id } })
}

export const deleteRecipeStepIngredient = async (id: number): Promise<void> => {
  await RecipeStepIngredientModel.destroy({ where: { id } })
}

export const saveRecipeStepIngredients = async (recipeStepIngredients: RecipeStepIngredient[], recipeStepId: number): Promise<void> => {
  for (const recipeStepIngredient of recipeStepIngredients) {
    await saveRecipeStepIngredient({ ...recipeStepIngredient, recipeStepId })
  }
}
