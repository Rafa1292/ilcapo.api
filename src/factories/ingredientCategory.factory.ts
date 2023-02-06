import { IngredientCategory } from '../services/ingredientCategory/ingredientCategory.types'
import * as ingredientCategoryValidator from '../validations/ingredientCategory.validator'

export const toNewIngredientCategory = async (ingredientCategory: any): Promise<IngredientCategory> => {
  await ingredientCategoryValidator.newIngredientCategoryIsValid(ingredientCategory)

  return {
    id: ingredientCategory.id,
    name: ingredientCategory.name,
    createdBy: ingredientCategory.createdBy,
    updatedBy: ingredientCategory.updatedBy,
    createdAt: ingredientCategory.createdAt,
    updatedAt: ingredientCategory.updatedAt,
    delete: ingredientCategory.delete
  }
}
