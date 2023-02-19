import { RecipeStep } from '../services/recipeStep/recipeStep.types'
import * as recipeStepValidator from '../validations/recipeStep.validator'

export const toNewRecipeStep = async (recipeStep: any): Promise<RecipeStep> => {
  await recipeStepValidator.newRecipeStepIsValid()

  return {
    id: recipeStep.id,
    stepNumber: recipeStep.stepNumber,
    description: recipeStep.description,
    cost: recipeStep.cost,
    minutesOfPreparation: recipeStep.minutesOfPreparation,
    recipeId: recipeStep.recipeId,
    recipeStepIngredients: recipeStep.recipeStepIngredients,
    createdBy: recipeStep.createdBy,
    updatedBy: recipeStep.updatedBy,
    createdAt: recipeStep.createdAt,
    updatedAt: recipeStep.updatedAt,
    delete: recipeStep.delete
  }
}
