import { ProductReference, NewProductReference } from './productReference.types'
import { ProductReferenceModel } from '../../db/models/productReference.model'
import { toNewProductReference } from '../../factories/productReference.factory'

export const getProductReferenceByModifierElementId = async (id: number): Promise<ProductReference> => {
  const response = await ProductReferenceModel.findByPk(id)
  if (response === null) throw new Error('ProductReference not found')
  return await toNewProductReference(response)
}

export const saveProductReference = async (productReference: NewProductReference): Promise<ProductReference> => {
  return await ProductReferenceModel.create(productReference)
}

export const updateProductReference = async (productReference: Partial<ProductReference>, id: number): Promise<void> => {
  await ProductReferenceModel.update(productReference, { where: { id } })
}

export const deleteProductReference = async (id: number): Promise<void> => {
  await ProductReferenceModel.destroy({ where: { id } })
}
