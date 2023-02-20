import { Ingredient } from '../services/ingredient/ingredient.types'
import { PreparationStep } from '../services/preparationStep/preparationStep.types'
import * as ingredientValidator from '../validations/ingredient.validator'

export const toNewIngredient = async (ingredient: any): Promise<Ingredient> => {
  await ingredientValidator.newIngredientIsValid(ingredient)
  const newIngredient: Ingredient = {
    id: ingredient.id,
    name: ingredient.name,
    measureId: ingredient.measureId,
    ingredientCategoryId: ingredient.ingredientCategoryId,
    cost: ingredient.cost,
    presentation: ingredient.presentation,
    price: ingredient.price,
    preparationSteps: ingredient.preparationSteps.filter((preparationStep: PreparationStep) => !preparationStep.delete),
    createdBy: ingredient.createdBy,
    updatedBy: ingredient.updatedBy,
    createdAt: ingredient.createdAt,
    updatedAt: ingredient.updatedAt,
    delete: ingredient.delete
  }
  return newIngredient
}

export const toNewIngredients = async (ingredients: any[]): Promise<Ingredient[]> => {
  return await Promise.all(ingredients.map(async (ingredient: any) => await toNewIngredient(ingredient)))
}
