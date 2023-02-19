import { PreparationStepInput } from '../services/preparationStepInput/preparationStepInput.types'

export const toNewPreparationStepInput = async (preparationStepInput: any): Promise<PreparationStepInput> => {
  return {
    id: preparationStepInput.id,
    quantity: preparationStepInput.quantity,
    inputId: preparationStepInput.inputId,
    preparationStepId: preparationStepInput.preparationStepId,
    measureId: preparationStepInput.measureId,
    createdBy: preparationStepInput.createdBy,
    updatedBy: preparationStepInput.updatedBy,
    createdAt: preparationStepInput.createdAt,
    updatedAt: preparationStepInput.updatedAt,
    delete: preparationStepInput.delete
  }
}
