import { Recipe, RecipeAttributes } from './recipe.types'
import { RecipeModel } from '../../db/models/recipe.model'
import { getRecipeStepsByRecipeId } from '../recipeStep/recipeStep.service'

export const getRecipes = async (): Promise<Recipe[]> => {
  const recipes = await RecipeModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'recipeSteps'
        }
      ]
    }
  )

  for (const recipe of recipes) {
    recipe.recipeSteps = await getRecipeStepsByRecipeId(recipe.id)
  }

  return recipes
}

export const getRecipeByName = async (name: string, id: number): Promise<Recipe | undefined> => {
  const objs = await RecipeModel.findAll({})
  const obj = objs.find((tmp: Recipe) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })
  return obj
}

export const getRecipesWithDeletedItems = async (): Promise<Recipe[]> => {
  return await RecipeModel.findAll()
}

export const getRecipeById = async (id: number): Promise<Recipe> => {
  const recipe = await RecipeModel.findByPk(id,
    {
      include: [
        {
          association: 'recipeSteps',
          where: { delete: false },
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
  if (recipe === null) throw new Error('Recipe not found')
  if (recipe.delete) throw new Error('Recipe deleted')
  return recipe
}

export const saveRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const { id, ...rest } = RecipeModel.getRecipe(recipe, 0)
  return await RecipeModel.create(rest)
}

export const updateRecipe = async (recipe: Partial<RecipeAttributes>, id: number): Promise<void> => {
  const updateRecipe = await RecipeModel.getPartialRecipe(recipe, 0)
  await RecipeModel.update(updateRecipe, { where: { id } })
}

export const deleteRecipe = async (id: number): Promise<void> => {
  await updateRecipe({delete: true}, id)
}

export const recoveryRecipe = async (id: number): Promise<void> => {
  await updateRecipe({delete: false}, id)
}
