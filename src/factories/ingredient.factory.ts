import { Ingredient } from '../services/ingredient/ingredient.types'
import * as ingredientValidator from '../validations/ingredient.validator'

export const toNewIngredient = async (ingredient: any): Promise<Ingredient> => {
  await ingredientValidator.newIngredientIsValid(ingredient)

  return {
    id: ingredient.id,
    name: ingredient.name,
    measureId: ingredient.measureId,
    ingredientCategoryId: ingredient.ingredientCategoryId,
    cost: ingredient.cost,
    presentation: ingredient.presentation,
    price: ingredient.price,
    preparationSteps: ingredient.preparationSteps,
    createdBy: ingredient.createdBy,
    updatedBy: ingredient.updatedBy,
    createdAt: ingredient.createdAt,
    updatedAt: ingredient.updatedAt,
    delete: ingredient.delete
  }
}
