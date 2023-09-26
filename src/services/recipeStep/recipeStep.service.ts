import { RecipeStep, RecipeStepAttributes } from './recipeStep.types'
import { RecipeStepModel } from '../../db/models/recipeStep.model'
import { getNow } from '../../utils/timeManager'

export const getRecipeStepsWithDeletedItems = async (): Promise<RecipeStep[]> => {
  return await RecipeStepModel.findAll()
}

const getRecipeStepsByRecipeId = async (recipeId: number): Promise<RecipeStep[]> => {
  return await RecipeStepModel.findAll({ where: { recipeId, delete: false } })
}

export const getRecipeStepById = async (id: number): Promise<RecipeStep> => {
  const recipeStep = await RecipeStepModel.findByPk(id,
    { include: { all: true } }
  )
  if (recipeStep === null) throw new Error('RecipeStep not found')
  if (recipeStep.delete) throw new Error('RecipeStep deleted')
  return recipeStep
}

export const saveRecipeStep = async (recipeStep: RecipeStep): Promise<RecipeStep> => {
  const { id, ...rest } = RecipeStepModel.getRecipeStep(recipeStep, 0)
  const savedRecipeStep = await RecipeStepModel.create(rest)
  await sortStepsAfterInsert(savedRecipeStep)
  return savedRecipeStep
}

export const updateRecipeStep = async (recipeStep: Partial<RecipeStepAttributes>, id: number): Promise<void> => {
  const updateRecipeStep = await RecipeStepModel.getPartialRecipeStep(recipeStep, 0)
  await sortStepsAfterUpdate(updateRecipeStep)
  await RecipeStepModel.update(updateRecipeStep, { where: { id } })
}

export const deleteRecipeStep = async (id: number): Promise<void> => {
  await updateRecipeStep({ delete: true }, id)
}

export const recoveryRecipeStep = async (id: number): Promise<void> => {
  await updateRecipeStep({ delete: false }, id)
}

export const stepUp = async (recipeStep: RecipeStep): Promise<void> => {
  if (recipeStep.stepNumber === 1) throw new Error('Step number is 1')
  await updateRecipeStep({ ...recipeStep, stepNumber: recipeStep.stepNumber - 1 }, recipeStep.id)
}

export const stepDown = async (recipeStep: RecipeStep): Promise<void> => {
  const recipeSteps = await getRecipeStepsByRecipeId(recipeStep.recipeId)
  if (recipeStep.stepNumber === recipeSteps.length) throw new Error('Step number is last')
  await updateRecipeStep({ ...recipeStep, stepNumber: recipeStep.stepNumber + 1 }, recipeStep.id)
}

const sortStepsAfterInsert = async (recipeStep: Partial<RecipeStep>): Promise<void> => {
  if (recipeStep.stepNumber === undefined) throw new Error('Step number is undefined')
  if (recipeStep.recipeId === undefined) throw new Error('Recipe id is undefined')
  const recipeSteps = await getRecipeStepsByRecipeId(recipeStep.recipeId)
  const repeatRecipeStep = recipeSteps.find((step) => step.stepNumber === recipeStep.stepNumber && step.id !== recipeStep.id)
  const now = getNow()
  if (repeatRecipeStep !== undefined) {
    for (const step of recipeSteps) {
      if (step.stepNumber >= recipeStep.stepNumber && step.id !== recipeStep.id) {
        const stepNumber = step.stepNumber + 1
        await RecipeStepModel.update({ stepNumber, updatedAt: now }, { where: { id: step.id } })
      }
    }
  }
}

export const sortStepsAfterDelete = async (recipeStep: Partial<RecipeStep>): Promise<void> => {
  if (recipeStep.stepNumber === undefined) throw new Error('Step number is undefined')
  if (recipeStep.recipeId === undefined) throw new Error('Recipe id is undefined')
  const recipeSteps = await getRecipeStepsByRecipeId(recipeStep.recipeId)
  const now = getNow()
  for (const step of recipeSteps) {
    if (step.stepNumber > recipeStep.stepNumber) {
      const stepNumber = step.stepNumber - 1
      await RecipeStepModel.update({ stepNumber, updatedAt: now }, { where: { id: step.id } })
    }
  }
}

const sortStepsAfterUpdate = async (recipeStep: Partial<RecipeStep>): Promise<void> => {
  if (recipeStep.stepNumber === undefined) throw new Error('Step number is undefined')
  if (recipeStep.id === undefined) throw new Error('Recipe step id is undefined')
  if (recipeStep.recipeId === undefined) throw new Error('Recipe id is undefined')
  const recipeSteps = await getRecipeStepsByRecipeId(recipeStep.recipeId)
  const updateRecipeStep = recipeSteps.find((step) => step.id === recipeStep.id)
  if (updateRecipeStep === undefined) throw new Error('Recipe step not found')
  const diference = updateRecipeStep?.stepNumber - recipeStep.stepNumber
  const modifier = diference > 0 ? 1 : -1
  const index = diference > 0 ? recipeStep.stepNumber : updateRecipeStep.stepNumber
  const length = diference > 0 ? updateRecipeStep.stepNumber : recipeStep.stepNumber
  const now = getNow()

  for (const step of recipeSteps) {
    if (step.stepNumber >= index && step.stepNumber <= length && step.id !== recipeStep.id) {
      const stepNumber = step.stepNumber + modifier
      await RecipeStepModel.update({ stepNumber, updatedAt: now }, { where: { id: step.id } })
    }
  }
}
