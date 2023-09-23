import { ProductRecipeModel } from '../../db/models/productRecipe.model'
import { ProductRecipe, ProductRecipeAttributes } from './productRecipe.types'

export const saveProductRecipe = async (productRecipe: ProductRecipe): Promise<ProductRecipe> => {
  const { id, ...rest } = ProductRecipeModel.getProductRecipe(productRecipe, 0)
  return await ProductRecipeModel.create(rest)
}

export const updateProductRecipe = async (productRecipe: Partial<ProductRecipeAttributes>, id: number): Promise<void> => {
  const updatedProductRecipe = ProductRecipeModel.getPartialProductRecipe(productRecipe, id)
  await ProductRecipeModel.update(updatedProductRecipe, { where: { id } })
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
