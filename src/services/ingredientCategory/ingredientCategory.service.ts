import { IngredientCategory, NewIngredientCategory } from './ingredientCategory.types'
import { IngredientCategoryModel } from '../../db/models/ingredientCategory.model'
import { toNewIngredientCategory } from '../../factories/ingredientCategory.factory'

export const getIngredientCategories = async (): Promise<IngredientCategory[]> => {
  return await IngredientCategoryModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'ingredients'
        }
      ]
    }
  )
}

export const getIngredientCategoriesWithDeletedItems = async (): Promise<IngredientCategory[]> => {
  return await IngredientCategoryModel.findAll()
}

export const getIngredientCategoryById = async (id: number): Promise<IngredientCategory> => {
  const response = await IngredientCategoryModel.findByPk(id)
  if (response === null) throw new Error('IngredientCategory not found')
  if (response.delete) throw new Error('IngredientCategory deleted')
  return await toNewIngredientCategory(response)
}

export const saveIngredientCategory = async (ingredientCategory: NewIngredientCategory): Promise<IngredientCategory> => {
  return await IngredientCategoryModel.create(ingredientCategory)
}

export const updateIngredientCategory = async (ingredientCategory: Partial<IngredientCategory>, id: number): Promise<void> => {
  await IngredientCategoryModel.update(ingredientCategory, { where: { id } })
}

export const deleteIngredientCategory = async (id: number): Promise<void> => {
  const ingredientCategory = await getIngredientCategoryById(id)
  ingredientCategory.delete = true
  await updateIngredientCategory(ingredientCategory, id)
}

export const recoveryIngredientCategory = async (id: number): Promise<void> => {
  const ingredientCategory = await getIngredientCategoryById(id)
  ingredientCategory.delete = false
  await updateIngredientCategory(ingredientCategory, id)
}
