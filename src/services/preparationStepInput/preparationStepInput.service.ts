import { PreparationStepInputModel } from '../../db/models/preparationStepInput.Model'
import { getNow } from '../../utils/timeManager'
import { PreparationStepInput, NewPreparationStepInput } from './preparationStepInput.types'

export const savePreparationStepInput = async (preparationStepInput: NewPreparationStepInput): Promise<PreparationStepInput> => {
  const now = getNow()
  preparationStepInput.createdAt = now
  preparationStepInput.updatedAt = now
  return await PreparationStepInputModel.create(preparationStepInput)
}

export const updatePreparationStepInput = async (preparationStepInput: Partial<PreparationStepInput>, id: number): Promise<void> => {
  const now = getNow()
  preparationStepInput.updatedAt = now
  await PreparationStepInputModel.update(preparationStepInput, { where: { id } })
}

export const deletePreparationStepInput = async (id: number): Promise<void> => {
  await PreparationStepInputModel.destroy({ where: { id } })
}

export const savePreparationStepInputs = async (preparationStepInputs: PreparationStepInput[], preparationStepId: number): Promise<void> => {
  for (const preparationStepInput of preparationStepInputs) {
    const { id, ...rest } = preparationStepInput
    await savePreparationStepInput({ ...rest, preparationStepId })
  }
}
