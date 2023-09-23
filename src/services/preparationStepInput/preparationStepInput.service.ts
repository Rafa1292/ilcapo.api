import { PreparationStepInputModel } from '../../db/models/preparationStepInput.Model'
import { PreparationStepInput, PreparationStepInputAttributes } from './preparationStepInput.types'

export const savePreparationStepInput = async (preparationStepInput: PreparationStepInput): Promise<PreparationStepInput> => {
  const { id, ...rest } = PreparationStepInputModel.getPeparationStepInput(preparationStepInput, 0);
  return await PreparationStepInputModel.create(rest)
}

export const updatePreparationStepInput = async (preparationStepInput: Partial<PreparationStepInputAttributes>, id: number): Promise<void> => {
  const updatedPreparationStepInput = PreparationStepInputModel.getPartialPeparationStepInput(preparationStepInput, id);
  await PreparationStepInputModel.update(updatedPreparationStepInput, { where: { id } })
}

export const deletePreparationStepInput = async (id: number): Promise<void> => {
  await PreparationStepInputModel.destroy({ where: { id } })
}

export const savePreparationStepInputs = async (preparationStepInputs: PreparationStepInput[], preparationStepId: number): Promise<void> => {
  for (const preparationStepInput of preparationStepInputs) {
    await savePreparationStepInput({ ...preparationStepInput, preparationStepId })
  }
}
