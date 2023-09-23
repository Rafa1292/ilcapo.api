import { PreparationStep, PreparationStepAttributes } from './preparationStep.types'
import { PreparationStepModel } from '../../db/models/preparationStep.model'
import { getNow } from '../../utils/timeManager'

export const getPreparationStepsWithDeletedItems = async (): Promise<PreparationStep[]> => {
  return await PreparationStepModel.findAll()
}

const getPreparationStepsByIngredientId = async (ingredientId: number): Promise<PreparationStep[]> => {
  return await PreparationStepModel.findAll({ where: { ingredientId, delete: false } })
}

export const getPreparationStepById = async (id: number): Promise<PreparationStep> => {
  const preparationStep = await PreparationStepModel.findByPk(id,
    { include: { all: true } }
  )
  if (preparationStep === null) throw new Error('PreparationStep not found')
  if (preparationStep.delete) throw new Error('PreparationStep deleted')
  return preparationStep
}

export const savePreparationStep = async (preparationStep: PreparationStep): Promise<PreparationStep> => {
  const { id, ...rest } = PreparationStepModel.getPreparationStep(preparationStep, 0)
  const savedPreparationStep = await PreparationStepModel.create(rest)
  await sortStepsAfterInsert(savedPreparationStep)
  return savedPreparationStep
}

export const updatePreparationStep = async (preparationStep: Partial<PreparationStepAttributes>, id: number): Promise<void> => {
  await sortStepsAfterUpdate(preparationStep)
  const updatedPreparationStep = PreparationStepModel.getPartialPreparationStep(preparationStep, id)
  await PreparationStepModel.update(updatedPreparationStep, { where: { id } })
}

export const deletePreparationStep = async (id: number): Promise<void> => {
  const preparationStep = await getPreparationStepById(id)
  await updatePreparationStep({ ...preparationStep, delete: true }, id)
}

export const recoveryPreparationStep = async (id: number): Promise<void> => {
  const preparationStep = await getPreparationStepById(id)
  await updatePreparationStep({ ...preparationStep, delete: false }, id)
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
    for (const preparationStep of preparationSteps) {
      if (preparationStep.stepNumber >= preparationStep.stepNumber && preparationStep.id !== preparationStep.id) {
        const stepNumber = preparationStep.stepNumber + 1
        await updatePreparationStep({ stepNumber }, preparationStep.id)
      }
    }
  }
}

const sortStepsAfterDelete = async (preparationStep: Partial<PreparationStep>): Promise<void> => {
  if (preparationStep.stepNumber === undefined) throw new Error('Step number is undefined')
  if (preparationStep.ingredientId === undefined) throw new Error('Ingredient id is undefined')
  const preparationSteps = await getPreparationStepsByIngredientId(preparationStep.ingredientId)
  for (const preparationStep of preparationSteps) {
    if (preparationStep.stepNumber > preparationStep.stepNumber) {
      const stepNumber = preparationStep.stepNumber - 1
      await updatePreparationStep({ stepNumber }, preparationStep.id)
    }
  }
}

const sortStepsAfterUpdate = async (preparationStep: Partial<PreparationStep>): Promise<void> => {
  if (preparationStep.stepNumber === undefined) throw new Error('Step number is undefined')
  if (preparationStep.id === undefined) throw new Error('Preparation step id is undefined')
  if (preparationStep.ingredientId === undefined) throw new Error('Ingredient id is undefined')
  const preparationSteps = await getPreparationStepsByIngredientId(preparationStep.ingredientId)
  const updatedPreparationStep = preparationSteps.find((step) => step.id === preparationStep.id)
  if (updatedPreparationStep === undefined) throw new Error('Preparation step not found')
  const diference = updatedPreparationStep?.stepNumber - preparationStep.stepNumber
  const modifier = diference > 0 ? 1 : -1
  const index = diference > 0 ? preparationStep.stepNumber : updatedPreparationStep.stepNumber
  const length = diference > 0 ? updatedPreparationStep.stepNumber : preparationStep.stepNumber

  for (const preparationStep of preparationSteps) {
    if (preparationStep.stepNumber >= index && preparationStep.stepNumber <= length && preparationStep.id !== preparationStep.id) {
      const stepNumber = preparationStep.stepNumber + modifier
      await updatePreparationStep({ stepNumber }, preparationStep.id)
    }
  }
}
