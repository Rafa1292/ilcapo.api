import { RecipeStep, NewRecipeStep } from './recipeStep.types'
import { toNewRecipeStep } from '../../factories/recipeStep.factory'
import { RecipeStepModel } from '../../db/models/recipeStep.model'
import { getNow } from '../../utils/timeManager'

export const getRecipeStepsWithDeletedItems = async (): Promise<RecipeStep[]> => {
  return await RecipeStepModel.findAll()
}

const getRecipeStepsByRecipeId = async (recipeId: number): Promise<RecipeStep[]> => {
  return await RecipeStepModel.findAll({ where: { recipeId, delete: false } })
}

export const getRecipeStepById = async (id: number): Promise<RecipeStep> => {
  const response = await RecipeStepModel.findByPk(id,
    { include: { all: true } }
  )
  if (response === null) throw new Error('RecipeStep not found')
  if (response.delete) throw new Error('RecipeStep deleted')
  return await toNewRecipeStep(response)
}

export const saveRecipeStep = async (recipeStep: NewRecipeStep): Promise<RecipeStep> => {
  const now = getNow()
  recipeStep.createdAt = now
  recipeStep.updatedAt = now
  const savedRecipeStep = await RecipeStepModel.create(recipeStep)
  await sortStepsAfterInsert(savedRecipeStep)
  return savedRecipeStep
}

export const updateRecipeStep = async (recipeStep: Partial<RecipeStep>, id: number): Promise<void> => {
  await sortStepsAfterUpdate(recipeStep)
  const now = getNow()
  recipeStep.updatedAt = now
  await RecipeStepModel.update(recipeStep, { where: { id } })
}

export const deleteRecipeStep = async (id: number): Promise<void> => {
  const recipeStep = await getRecipeStepById(id)
  await RecipeStepModel.update({ delete: true }, { where: { id } })
  await sortStepsAfterDelete(recipeStep)
}

export const recoveryRecipeStep = async (id: number): Promise<void> => {
  const recipeStep = await getRecipeStepById(id)
  recipeStep.delete = false
  await updateRecipeStep(recipeStep, id)
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

const sortStepsAfterDelete = async (recipeStep: Partial<RecipeStep>): Promise<void> => {
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
