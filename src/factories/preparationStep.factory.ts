import { PreparationStep } from '../services/preparationStep/preparationStep.types'
import * as preparationStepValidator from '../validations/preparationStep.validator'

export const toNewPreparationStep = async (preparationStep: any): Promise<PreparationStep> => {
  await preparationStepValidator.newPreparationStepIsValid(preparationStep)

  return {
    id: preparationStep.id,
    stepNumber: preparationStep.stepNumber,
    description: preparationStep.description,
    cost: preparationStep.cost,
    minutesOfPreparation: preparationStep.minutesOfPreparation,
    ingredientId: preparationStep.ingredientId,
    createdBy: preparationStep.createdBy,
    updatedBy: preparationStep.updatedBy,
    createdAt: preparationStep.createdAt,
    updatedAt: preparationStep.updatedAt,
    delete: preparationStep.delete
  }
}
