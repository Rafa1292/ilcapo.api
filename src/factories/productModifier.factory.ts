import { ProductModifier } from '../services/productModifier/productModifier.types'

export const toNewProductModifier = async (productModifier: any): Promise<ProductModifier> => {
  return {
    id: productModifier.id,
    productId: productModifier.productId,
    modifierGroupId: productModifier.modifierGroupId,
    createdBy: productModifier.createdBy,
    updatedBy: productModifier.updatedBy,
    createdAt: productModifier.createdAt,
    updatedAt: productModifier.updatedAt,
    delete: productModifier.delete
  }
}
