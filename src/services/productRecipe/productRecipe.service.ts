import { ProductRecipeModel } from '../../db/models/productRecipe.model'
import { NewProductRecipe, ProductRecipe } from './productRecipe.types'

export const saveProductRecipe = async (productRecipe: NewProductRecipe): Promise<ProductRecipe> => {
  return await ProductRecipeModel.create(productRecipe)
}

export const updateProductRecipe = async (productRecipe: Partial<ProductRecipe>, id: number): Promise<void> => {
  await ProductRecipeModel.update(productRecipe, { where: { id } })
}

export const deleteProductRecipe = async (id: number): Promise<void> => {
  await ProductRecipeModel.destroy({ where: { id } })
}

export const findProductRecipe = async (productId: number, modifierElementId: number): Promise<ProductRecipe | null> => {
  return await ProductRecipeModel.findOne(
    {
      where:
      {
        productId,
        modifierElementId
      },
      include: ['recipe']
    })
}
