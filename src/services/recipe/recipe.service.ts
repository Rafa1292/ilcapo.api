import { Recipe, NewRecipe } from './recipe.types'
import { RecipeModel } from '../../db/models/recipe.model'
import { toNewRecipe, toNewRecipes } from '../../factories/recipe.factory'

export const getRecipes = async (): Promise<Recipe[]> => {
  const recipes = await RecipeModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'recipeSteps',
          include: [
            {
              association: 'recipeStepIngredients',
              include: [
                {
                  association: 'ingredient'
                },
                {
                  association: 'measure'
                }
              ]
            }
          ]
        }
      ]
    }
  )

  return await toNewRecipes(recipes)
}

export const getRecipesWithDeletedItems = async (): Promise<Recipe[]> => {
  return await RecipeModel.findAll()
}

export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await RecipeModel.findByPk(id,
    {
      include: [
        {
          association: 'recipeSteps',
          include: [
            {
              association: 'recipeStepIngredients',
              include: [
                {
                  association: 'ingredient'
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
  if (response === null) throw new Error('Recipe not found')
  if (response.delete) throw new Error('Recipe deleted')
  return await toNewRecipe(response)
}

export const saveRecipe = async (recipe: NewRecipe): Promise<Recipe> => {
  return await RecipeModel.create(recipe)
}

export const updateRecipe = async (recipe: Partial<Recipe>, id: number): Promise<void> => {
  await RecipeModel.update(recipe, { where: { id } })
}

export const deleteRecipe = async (id: number): Promise<void> => {
  const recipe = await getRecipeById(id)
  recipe.delete = true
  await updateRecipe(recipe, id)
}

export const recoveryRecipe = async (id: number): Promise<void> => {
  const recipe = await getRecipeById(id)
  recipe.delete = false
  await updateRecipe(recipe, id)
}
