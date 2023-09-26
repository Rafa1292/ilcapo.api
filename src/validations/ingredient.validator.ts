import { getIngredientsWithDeletedItems } from '../services/ingredient/ingredient.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const ingredients = await getIngredientsWithDeletedItems()
  const ingredient = ingredients.find((ingredient) => ingredient.name.toLowerCase() === name.toLowerCase())
  if (ingredient !== null && ingredient !== undefined) {
    if (ingredient?.id !== id) {
      throw new Error('Este nombre de ingrediente ya existe')
    }
  }
}

export const newIngredientIsValid = async (ingredient: any): Promise<boolean> => {
  parseName(ingredient?.name)
  await validateUniqueName(ingredient?.name, ingredient?.id)
  return true
}
