import { ProductModifierModel } from '../../db/models/productModifier.model'
import { ProductModifier, NewProductModifier } from './productModifier.types'

export const saveProductModifier = async (productModifier: NewProductModifier): Promise<ProductModifier> => {
  return await ProductModifierModel.create(productModifier)
}

export const updateProductModifier = async (productModifier: Partial<ProductModifier>, id: number): Promise<void> => {
  await ProductModifierModel.update(productModifier, { where: { id } })
}

export const deleteProductModifier = async (id: number): Promise<void> => {
  await ProductModifierModel.destroy({ where: { id } })
}

export const saveProductModifiers = async (productModifiers: ProductModifier[], modifierGroupId: number): Promise<void> => {
  for (const productModifier of productModifiers) {
    const { id, ...rest } = productModifier
    await saveProductModifier({ ...rest, modifierGroupId: modifierGroupId })
  }
}

export const getProductModifiersByProductId = async (productId: number): Promise<ProductModifier[]> => {
  return await ProductModifierModel.findAll(
    {
      where: {
        productId
      },
      include: [
        {
          association: 'modifierGroup',
          include: [
            {
              association: 'elements',
              include: [
                {
                  association: 'modifierUpgrade'
                },
                {
                  association: 'productReference'
                }
              ]
            }
          ]
        }
      ]
    })
}
