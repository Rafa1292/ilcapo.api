import { Recipe } from '../services/recipe/recipe.types'
import { RecipeStep } from '../services/recipeStep/recipeStep.types'
import * as recipeValidator from '../validations/recipe.validator'

export const toNewRecipe = async (recipe: any): Promise<Recipe> => {
  await recipeValidator.newRecipeIsValid(recipe)

  return {
    id: recipe.id,
    name: recipe.name,
    cost: recipe.cost,
    recipeSteps: recipe.recipeSteps !== undefined ? recipe.recipeSteps.filter((recipeStep: RecipeStep) => !recipeStep.delete) : [],
    createdBy: recipe.createdBy,
    updatedBy: recipe.updatedBy,
    createdAt: recipe.createdAt,
    updatedAt: recipe.updatedAt,
    delete: recipe.delete
  }
}

export const toNewRecipes = async (recipes: any[]): Promise<Recipe[]> => {
  return await Promise.all(recipes.map(async (recipe: any) => await toNewRecipe(recipe)))
}
