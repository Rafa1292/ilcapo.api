import { getRecipesWithDeletedItems } from '../services/recipe/recipe.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const recipes = await getRecipesWithDeletedItems()
  const recipe = recipes.find((recipe) => recipe.name.toLowerCase() === name.toLowerCase())
  if (recipe !== null && recipe !== undefined) {
    if (recipe?.id !== id) {
      if (recipe.delete) {
        throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de recetas borradas')
      }
      throw new Error('Este nombre de ingrediente ya existe')
    }
  }
}

export const newRecipeIsValid = async (recipe: any): Promise<boolean> => {
  parseName(recipe?.name)
  await validateUniqueName(recipe?.name, recipe?.id)
  return true
}
