import { IngredientCategory, IngredientCategoryAttributes } from './ingredientCategory.types'
import { IngredientCategoryModel } from '../../db/models/ingredientCategory.model'

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

export const getIngredientCategoryByName = async (name: string, id: number): Promise<IngredientCategory | undefined> => {
  const objs = await IngredientCategoryModel.findAll({})

  const obj = objs.find((tmp: IngredientCategory) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })


  return obj
}

export const getIngredientCategoryById = async (id: number): Promise<IngredientCategory> => {
  const response = await IngredientCategoryModel.findByPk(id)
  if (response === null) throw new Error('IngredientCategory not found')
  if (response.delete) throw new Error('IngredientCategory deleted')
  return response
}

export const saveIngredientCategory = async (ingredientCategory: IngredientCategory): Promise<IngredientCategory> => {
  const { id, ...newIngredientCategory } = IngredientCategoryModel.getIngredientCategory(ingredientCategory, 0)
  return await IngredientCategoryModel.create(newIngredientCategory)
}

export const updateIngredientCategory = async (ingredientCategory: Partial<IngredientCategoryAttributes>, id: number): Promise<void> => {
  const updateIngredientCategory = IngredientCategoryModel.getPartialIngredientCategory(ingredientCategory, 0)
  await IngredientCategoryModel.update(updateIngredientCategory, { where: { id } })
}

export const deleteIngredientCategory = async (id: number): Promise<void> => {
  
  await updateIngredientCategory({delete: true}, id)
}

export const recoveryIngredientCategory = async (id: number): Promise<void> => {
  await updateIngredientCategory({delete: false}, id)
}
