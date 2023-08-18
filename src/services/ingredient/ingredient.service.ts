import { Ingredient, NewIngredient } from './ingredient.types'
import { IngredientModel } from '../../db/models/ingredient.model'
import { toNewIngredient, toNewIngredients } from '../../factories/ingredient.factory'
import { getNow } from '../../utils/timeManager'

export const getIngredients = async (): Promise<Ingredient[]> => {
  const ingredients = await IngredientModel.findAll(
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

  return await toNewIngredients(ingredients)
}

export const getIngredientsWithDeletedItems = async (): Promise<Ingredient[]> => {
  return await IngredientModel.findAll()
}

export const getIngredientById = async (id: number): Promise<Ingredient> => {
  const response = await IngredientModel.findByPk(id,
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
  if (response === null) throw new Error('Ingredient not found')
  if (response.delete) throw new Error('Ingredient deleted')
  return await toNewIngredient(response)
}

export const saveIngredient = async (ingredient: NewIngredient): Promise<Ingredient> => {
  const now = getNow()
  ingredient.createdAt = now
  ingredient.updatedAt = now
  return await IngredientModel.create(ingredient)
}

export const updateIngredient = async (ingredient: Partial<Ingredient>, id: number): Promise<void> => {
  const now = getNow()
  ingredient.updatedAt = now
  await IngredientModel.update(ingredient, { where: { id } })
}

export const deleteIngredient = async (id: number): Promise<void> => {
  const ingredient = await getIngredientById(id)
  const now = getNow()
  ingredient.updatedAt = now
  ingredient.delete = true
  await updateIngredient(ingredient, id)
}

export const recoveryIngredient = async (id: number): Promise<void> => {
  const ingredient = await getIngredientById(id)
  const now = getNow()
  ingredient.updatedAt = now
  ingredient.delete = false
  await updateIngredient(ingredient, id)
}
