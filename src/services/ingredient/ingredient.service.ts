import { Ingredient, IngredientAttributes } from './ingredient.types'
import { IngredientModel } from '../../db/models/ingredient.model'
import { validateIngredient, validateIngredients } from '../../factories/ingredient.factory'
import { getNow } from '../../utils/timeManager'

export const getIngredients = async (): Promise<Ingredient[]> => {
  return await IngredientModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'preparationSteps',
          include: [
            {
              association: 'preparationStepInputs',
              include: [
                {
                  association: 'input'
                },
                {
                  association: 'measure'
                }
              ]
            }
          ]
        },
        'measure'
      ]
    }
  )
}

export const getIngredientsWithDeletedItems = async (): Promise<Ingredient[]> => {
  return await IngredientModel.findAll()
}

export const getIngredientById = async (id: number): Promise<Ingredient> => {
  const ingredient = await IngredientModel.findByPk(id,
    {
      include: [
        {
          association: 'preparationSteps',
          include: [
            {
              association: 'preparationStepInputs',
              include: [
                {
                  association: 'input'
                },
                {
                  association: 'measure'
                }
              ]
            }
          ]
        }
      ]
    })
  if (ingredient === null) throw new Error('Ingredient not found')
  if (ingredient.delete) throw new Error('Ingredient deleted')
  return ingredient
}

export const saveIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
  const { id, ...ingredientToSave } = IngredientModel.getIngredient(ingredient, 0)
  return await IngredientModel.create(ingredientToSave)
}

export const updateIngredient = async (ingredient: Partial<IngredientAttributes>, id: number): Promise<void> => {
  const ingredientToUpdate = IngredientModel.getPartialIngredient(ingredient, 0)
  await IngredientModel.update(ingredientToUpdate, { where: { id } })
}

export const deleteIngredient = async (id: number): Promise<void> => {
  await updateIngredient({ delete: true }, id)
}

export const recoveryIngredient = async (id: number): Promise<void> => {
  await updateIngredient({ delete: false }, id)
}
