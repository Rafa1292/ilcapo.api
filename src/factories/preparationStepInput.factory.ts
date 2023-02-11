import { PreparationStepInput } from '../services/preparationStepInput/preparationStepInput.types'

export const toNewPreparationStepInput = async (preparationStep: any): Promise<PreparationStepInput> => {
  return {
    id: preparationStep.id,
    quantity: preparationStep.quantity,
    inputId: preparationStep.inputId,
    preparationStepId: preparationStep.preparationStepId,
    measureId: preparationStep.measureId,
    createdBy: preparationStep.createdBy,
    updatedBy: preparationStep.updatedBy,
    createdAt: preparationStep.createdAt,
    updatedAt: preparationStep.updatedAt,
    delete: preparationStep.delete
  }
}
