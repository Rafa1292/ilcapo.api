import { ProductRecipeModel } from '../../db/models/productRecipe.model'
import { getNow } from '../../utils/timeManager'
import { NewProductRecipe, ProductRecipe } from './productRecipe.types'

export const saveProductRecipe = async (productRecipe: NewProductRecipe): Promise<ProductRecipe> => {
  const now = getNow()
  productRecipe.createdAt = now
  productRecipe.updatedAt = now
  return await ProductRecipeModel.create(productRecipe)
}

export const updateProductRecipe = async (productRecipe: Partial<ProductRecipe>, id: number): Promise<void> => {
  const now = getNow()
  productRecipe.updatedAt = now
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
