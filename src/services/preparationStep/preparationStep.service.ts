import { PreparationStep, NewPreparationStep } from './preparationStep.types'
import { PreparationStepModel } from '../../db/models/preparationStep.model'
import { toNewPreparationStep } from '../../factories/preparationStep.factory'

export const getPreparationStepsWithDeletedItems = async (): Promise<PreparationStep[]> => {
  return await PreparationStepModel.findAll()
}

export const getPreparationStepById = async (id: number): Promise<PreparationStep> => {
  const response = await PreparationStepModel.findByPk(id,
    { include: { all: true } }
  )
  if (response === null) throw new Error('PreparationStep not found')
  if (response.delete) throw new Error('PreparationStep deleted')
  return await toNewPreparationStep(response)
}

export const savePreparationStep = async (preparationStep: NewPreparationStep): Promise<PreparationStep> => {
  return await PreparationStepModel.create(preparationStep)
}

export const updatePreparationStep = async (preparationStep: Partial<PreparationStep>, id: number): Promise<void> => {
  await PreparationStepModel.update(preparationStep, { where: { id } })
}

export const deletePreparationStep = async (id: number): Promise<void> => {
  const preparationStep = await getPreparationStepById(id)
  preparationStep.delete = true
  await updatePreparationStep(preparationStep, id)
}

export const recoveryPreparationStep = async (id: number): Promise<void> => {
  const preparationStep = await getPreparationStepById(id)
  preparationStep.delete = false
  await updatePreparationStep(preparationStep, id)
}
