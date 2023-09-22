import { Recipe, NewRecipe } from './recipe.types'
import { RecipeModel } from '../../db/models/recipe.model'
import { validateRecipe, validateRecipes } from '../../factories/recipe.factory'
import { getNow } from '../../utils/timeManager'

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

  return await validateRecipes(recipes)
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
  console.log(response)
  return await validateRecipe(response)
}

export const saveRecipe = async (recipe: NewRecipe): Promise<Recipe> => {
  const now = getNow()
  recipe.createdAt = now
  recipe.updatedAt = now
  return await RecipeModel.create(recipe)
}

export const updateRecipe = async (recipe: Partial<Recipe>, id: number): Promise<void> => {
  const now = getNow()
  recipe.updatedAt = now
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
