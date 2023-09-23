import { ProductModifierModel } from '../../db/models/productModifier.model'
import { ProductModifier } from './productModifier.types'

export const saveProductModifier = async (
  productModifier: ProductModifier
): Promise<ProductModifier> => {
  const { id, ...rest } =  ProductModifierModel.getProductModifier(productModifier, 0)
  return await ProductModifierModel.create(rest)
}

export const updateProductModifier = async (
  productModifier: Partial<ProductModifier>,
  id: number
): Promise<void> => {
  const updatedProductModifier = ProductModifierModel.getPartialProductModifier(productModifier, id)
  await ProductModifierModel.update(updatedProductModifier, { where: { id } })
}

export const deleteProductModifier = async (id: number): Promise<void> => {
  await ProductModifierModel.destroy({ where: { id } })
}

export const saveProductModifiers = async (
  productModifiers: ProductModifier[],
  modifierGroupId: number
): Promise<void> => {
  for (const productModifier of productModifiers) {
    await saveProductModifier({ ...productModifier, modifierGroupId: modifierGroupId })
  }
}

export const getProductModifiersByProductId = async (
  productId: number
): Promise<ProductModifier[]> => {
  return await ProductModifierModel.findAll({
    where: {
      productId,
      delete: false,
    },
    include: [
      {
        association: 'modifierGroup',
        where: { delete: false },
        include: [
          {
            association: 'elements',
            where: {
              delete: false,
            },
            include: [
              {
                association: 'modifierUpgrade',
                include: ['prices'],
              },
              {
                association: 'productReference',
              },
              {
                association: 'prices',
              },
            ],
          },
        ],
      },
    ],
  })
}

export const upProductModifierOrder = async (id: number): Promise<void> => {
  const productModifier = await ProductModifierModel.findByPk(id)
  if (!productModifier) throw new Error('Product Modifier not found')
  const productModifiers = await ProductModifierModel.findAll({
    where: {
      productId: productModifier.productId,
    },
    order: [['order', 'ASC']],
  })

  const modifiersCount = productModifiers.length
  const order = productModifier.order === null ? 0 : productModifier.order
  if (order < modifiersCount)
  {
    await updateProductModifier({ order: (order + 1) }, productModifier.id)
    for (const modifier of productModifiers) {
      if(modifier.order === null){
        await updateProductModifier({ order: modifiersCount },  modifier.id)
      }
      if(modifier.order === (order + 1)) {
        await updateProductModifier({ order: order },  modifier.id)
        break
      }
    }
  }
}

export const downProductModifierOrder = async (id: number): Promise<void> => {
  const productModifier = await ProductModifierModel.findByPk(id)
  if (!productModifier) throw new Error('Product Modifier not found')
  const productModifiers = await ProductModifierModel.findAll({
    where: {
      productId: productModifier.productId,
    },
    order: [['order', 'ASC']],
  })

  const order = productModifier.order === null ? 0 : productModifier.order
  if (order > 1)
  {
    await updateProductModifier({ order: order -1 }, productModifier.id )
    for (const modifier of productModifiers) {
      if(modifier.order === null){
        await updateProductModifier({ order: productModifiers.length }, modifier.id )
      }
      if(modifier.order === (order - 1)) {
        await updateProductModifier({ order: order }, modifier.id)
        break
      }
    }
  }
}
