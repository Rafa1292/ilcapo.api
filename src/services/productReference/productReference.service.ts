import { ProductReference } from './productReference.types'
import { ProductReferenceModel } from '../../db/models/productReference.model'

export const getProductReferenceByModifierElementId = async (id: number): Promise<ProductReference> => {
  const productReference = await ProductReferenceModel.findOne({ where: { modifierElementId: id } })
  if (productReference === null) throw new Error('ProductReference not found')
  return productReference
}

export const saveProductReference = async (productReference: ProductReference): Promise<ProductReference> => {
  const { id, ...rest } = ProductReferenceModel.getProductReference(productReference, 0)
  return await ProductReferenceModel.create(rest)
}

export const updateProductReference = async (productReference: Partial<ProductReference>, id: number): Promise<void> => {
  const updatedProductReference = ProductReferenceModel.getPartialProductReference(productReference, id)
  await ProductReferenceModel.update(updatedProductReference, { where: { id } })
}

export const deleteProductReference = async (modifierElementId: number): Promise<void> => {
  await ProductReferenceModel.destroy({ where: { modifierElementId } })
}
