import { getIngredientCategoriesWithDeletedItems } from '../services/ingredientCategory/ingredientCategory.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const ingredientCategories = await getIngredientCategoriesWithDeletedItems()
  const ingredientCategory = ingredientCategories.find((ingredientCategory) => ingredientCategory.name.toLowerCase() === name.toLowerCase())
  if (ingredientCategory !== null && ingredientCategory !== undefined) {
    if (ingredientCategory?.id !== id) {
      throw new Error('Este nombre de categoria ya existe')
    }
  }
}

export const newIngredientCategoryIsValid = async (ingredientCategory: any): Promise<boolean> => {
  parseName(ingredientCategory?.name)
  await validateUniqueName(ingredientCategory?.name, ingredientCategory?.id)
  return true
}
