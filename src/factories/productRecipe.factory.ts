import { z } from 'zod'
import { ProductRecipe } from '../services/productRecipe/productRecipe.types'

const productRecipeSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  modifierElementId: z.number({
    required_error: 'El elemento modificador es requerido',
    invalid_type_error: 'El elemento modificador debe ser un numero entero',
  }),
  productId: z.number({
    required_error: 'El producto es requerido',
    invalid_type_error: 'El producto debe ser un numero entero',
  }),
  recipeId: z.number({
    required_error: 'La receta es requerida',
    invalid_type_error: 'La receta debe ser un numero entero',
  })
})

export const validateProductRecipe = async (productRecipe: any): Promise<ProductRecipe> => {
  const result = await productRecipeSchema.safeParseAsync(productRecipe)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialProductRecipe = async (productRecipe: any): Promise<Partial<ProductRecipe>> => {
  const result = await productRecipeSchema.partial().safeParseAsync(productRecipe)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateProductRecipes = async (productRecipes: any[]): Promise<ProductRecipe[]> => {
  return await Promise.all(
    productRecipes.map(async (productRecipe) => {
      return await validateProductRecipe(productRecipe)
    })
  )
}
