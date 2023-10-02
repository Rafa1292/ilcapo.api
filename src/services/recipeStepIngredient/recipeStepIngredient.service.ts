import { Transaction } from 'sequelize'
import { RecipeStepIngredientModel } from '../../db/models/recipeStepIngredient.model'
import { RecipeStepIngredient } from './recipeStepIngredient.type'

export const saveRecipeStepIngredient = async (recipeStepIngredient: RecipeStepIngredient, transaction?: Transaction): Promise<RecipeStepIngredient> => {
  console.log('init saveRecipeStepIngredient----------------')
  const currentTransaction = transaction ?? await RecipeStepIngredientModel.sequelize?.transaction()
  if (currentTransaction === undefined) throw new Error('Transaction undefined')
  const { id, ...rest } = RecipeStepIngredientModel.getRecipeStepIngredient(recipeStepIngredient,0)
  const result = await RecipeStepIngredientModel.create(rest, { transaction: currentTransaction } )

  if(transaction === undefined) await currentTransaction.commit()

  return result
}

export const updateRecipeStepIngredient = async (recipeStepIngredient: Partial<RecipeStepIngredient>, id: number): Promise<void> => {
  const updateRecipeStepIngredient = await RecipeStepIngredientModel.getPartialRecipeStepIngredient(recipeStepIngredient, 0)
  await RecipeStepIngredientModel.update(updateRecipeStepIngredient, { where: { id } })
}

export const deleteRecipeStepIngredient = async (id: number): Promise<void> => {
  await RecipeStepIngredientModel.destroy({ where: { id } })
}

export const saveRecipeStepIngredients = async (recipeStepIngredients: RecipeStepIngredient[], recipeStepId: number, Transaction?: Transaction): Promise<void> => {
  for (const recipeStepIngredient of recipeStepIngredients) {
    await saveRecipeStepIngredient({ ...recipeStepIngredient, recipeStepId }, Transaction)
  }
}
