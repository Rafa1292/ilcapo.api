import { PreparationStep, NewPreparationStep } from './preparationStep.types'
import { PreparationStepModel } from '../../db/models/preparationStep.model'
import { toNewPreparationStep } from '../../factories/preparationStep.factory'

export const getPreparationStepsWithDeletedItems = async (): Promise<PreparationStep[]> => {
  return await PreparationStepModel.findAll()
}

const getPreparationStepsByIngredientId = async (ingredientId: number): Promise<PreparationStep[]> => {
  return await PreparationStepModel.findAll({ where: { ingredientId, delete: false } })
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
  const savedPreparationStep = await PreparationStepModel.create(preparationStep)
  await sortStepsAfterInsert(savedPreparationStep)
  return savedPreparationStep
}

export const updatePreparationStep = async (preparationStep: Partial<PreparationStep>, id: number): Promise<void> => {
  await sortStepsAfterUpdate(preparationStep)
  await PreparationStepModel.update(preparationStep, { where: { id } })
}

export const deletePreparationStep = async (id: number): Promise<void> => {
  const preparationStep = await getPreparationStepById(id)
  await PreparationStepModel.update({ delete: true }, { where: { id } })
  await sortStepsAfterDelete(preparationStep)
}

export const recoveryPreparationStep = async (id: number): Promise<void> => {
  const preparationStep = await getPreparationStepById(id)
  preparationStep.delete = false
  await updatePreparationStep(preparationStep, id)
}

export const stepUp = async (preparationStep: PreparationStep): Promise<void> => {
  if (preparationStep.stepNumber === 1) throw new Error('Step number is 1')
  await updatePreparationStep({ ...preparationStep, stepNumber: preparationStep.stepNumber - 1 }, preparationStep.id)
}

export const stepDown = async (preparationStep: PreparationStep): Promise<void> => {
  const preparationSteps = await getPreparationStepsByIngredientId(preparationStep.ingredientId)
  if (preparationStep.stepNumber === preparationSteps.length) throw new Error('Step number is last')
  await updatePreparationStep({ ...preparationStep, stepNumber: preparationStep.stepNumber + 1 }, preparationStep.id)
}

const sortStepsAfterInsert = async (preparationStep: Partial<PreparationStep>): Promise<void> => {
  if (preparationStep.stepNumber === undefined) throw new Error('Step number is undefined')
  if (preparationStep.ingredientId === undefined) throw new Error('Ingredient id is undefined')
  const preparationSteps = await getPreparationStepsByIngredientId(preparationStep.ingredientId)
  const repeatPreparationStep = preparationSteps.find((step) => step.stepNumber === preparationStep.stepNumber && step.id !== preparationStep.id)
  if (repeatPreparationStep !== undefined) {
    for (const step of preparationSteps) {
      if (step.stepNumber >= preparationStep.stepNumber && step.id !== preparationStep.id) {
        const stepNumber = step.stepNumber + 1
        await PreparationStepModel.update({ stepNumber }, { where: { id: step.id } })
      }
    }
  }
}

const sortStepsAfterDelete = async (preparationStep: Partial<PreparationStep>): Promise<void> => {
  if (preparationStep.stepNumber === undefined) throw new Error('Step number is undefined')
  if (preparationStep.ingredientId === undefined) throw new Error('Ingredient id is undefined')
  const preparationSteps = await getPreparationStepsByIngredientId(preparationStep.ingredientId)
  for (const step of preparationSteps) {
    if (step.stepNumber > preparationStep.stepNumber) {
      const stepNumber = step.stepNumber - 1
      await PreparationStepModel.update({ stepNumber }, { where: { id: step.id } })
    }
  }
}

const sortStepsAfterUpdate = async (preparationStep: Partial<PreparationStep>): Promise<void> => {
  if (preparationStep.stepNumber === undefined) throw new Error('Step number is undefined')
  if (preparationStep.id === undefined) throw new Error('Preparation step id is undefined')
  if (preparationStep.ingredientId === undefined) throw new Error('Ingredient id is undefined')
  const preparationSteps = await getPreparationStepsByIngredientId(preparationStep.ingredientId)
  const updatePreparationStep = preparationSteps.find((step) => step.id === preparationStep.id)
  if (updatePreparationStep === undefined) throw new Error('Preparation step not found')
  const diference = updatePreparationStep?.stepNumber - preparationStep.stepNumber
  const modifier = diference > 0 ? 1 : -1
  const index = diference > 0 ? preparationStep.stepNumber : updatePreparationStep.stepNumber
  const length = diference > 0 ? updatePreparationStep.stepNumber : preparationStep.stepNumber

  for (const step of preparationSteps) {
    if (step.stepNumber >= index && step.stepNumber <= length && step.id !== preparationStep.id) {
      const stepNumber = step.stepNumber + modifier
      await PreparationStepModel.update({ stepNumber }, { where: { id: step.id } })
    }
  }
}
