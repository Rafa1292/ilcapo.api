import { ProductRecipe } from '../services/productRecipe/productRecipe.types'

export const toNewProductRecipe = async (productRecipe: any): Promise<ProductRecipe> => {
  return {
    id: productRecipe.id,
    modifierElementId: productRecipe.modifierElementId,
    productId: productRecipe.productId,
    recipeId: productRecipe.recipeId,
    createdBy: productRecipe.createdBy,
    updatedBy: productRecipe.updatedBy,
    createdAt: productRecipe.createdAt,
    updatedAt: productRecipe.updatedAt,
    delete: productRecipe.delete
  }
}
