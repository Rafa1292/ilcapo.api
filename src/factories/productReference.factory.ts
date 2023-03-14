import { ProductReference } from '../services/productReference/productReference.types'

export const toNewProductReference = async (product: any): Promise<ProductReference> => {
  return {
    id: product.id,
    productId: product.productId,
    modifierElementId: product.modifierElementId,
    createdBy: product.createdBy,
    updatedBy: product.updatedBy,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  }
}

export const toNewProductReferences = async (productReferences: any[]): Promise<ProductReference[]> => {
  return await Promise.all(productReferences.map(async (productReference: any) => await toNewProductReference(productReference)))
}
