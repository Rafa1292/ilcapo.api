import { ProductReference, NewProductReference } from './productReference.types'
import { ProductReferenceModel } from '../../db/models/productReference.model'
import { validateProductReference } from '../../factories/productReference.factory'
import { getNow } from '../../utils/timeManager'

export const getProductReferenceByModifierElementId = async (id: number): Promise<ProductReference> => {
  const response = await ProductReferenceModel.findOne({ where: { modifierElementId: id } })
  if (response === null) throw new Error('ProductReference not found')
  return await validateProductReference(response)
}

export const saveProductReference = async (productReference: NewProductReference): Promise<ProductReference> => {
  const now = getNow()
  productReference.createdAt = now
  productReference.updatedAt = now
  return await ProductReferenceModel.create(productReference)
}

export const updateProductReference = async (productReference: Partial<ProductReference>, id: number): Promise<void> => {
  const now = getNow()
  productReference.updatedAt = now
  await ProductReferenceModel.update(productReference, { where: { id } })
}

export const deleteProductReference = async (modifierElementId: number): Promise<void> => {
  await ProductReferenceModel.destroy({ where: { modifierElementId } })
}
