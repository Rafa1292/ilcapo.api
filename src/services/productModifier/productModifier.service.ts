import { ProductModifierModel } from '../../db/models/productModifier.model'
import { getNow } from '../../utils/timeManager'
import { ProductModifier, NewProductModifier } from './productModifier.types'

export const saveProductModifier = async (
  productModifier: NewProductModifier
): Promise<ProductModifier> => {
  const now = getNow()
  productModifier.createdAt = now
  productModifier.updatedAt = now
  return await ProductModifierModel.create(productModifier)
}

export const updateProductModifier = async (
  productModifier: Partial<ProductModifier>,
  id: number
): Promise<void> => {
  const now = getNow()
  productModifier.updatedAt = now
  await ProductModifierModel.update(productModifier, { where: { id } })
}

export const deleteProductModifier = async (id: number): Promise<void> => {
  await ProductModifierModel.destroy({ where: { id } })
}

export const saveProductModifiers = async (
  productModifiers: ProductModifier[],
  modifierGroupId: number
): Promise<void> => {
  for (const productModifier of productModifiers) {
    const { id, ...rest } = productModifier
    await saveProductModifier({ ...rest, modifierGroupId: modifierGroupId })
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
    await productModifier.update({ order: (order + 1) }, { where: { id: productModifier.id } })
    for (const modifier of productModifiers) {
      if(modifier.order === null){
        await modifier.update({ order: modifiersCount }, { where: { id: modifier.id } })
      }
      if(modifier.order === (order + 1)) {
        await modifier.update({ order: order }, { where: { id: modifier.id } })
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
    await productModifier.update({ order: order -1 }, { where: { id: productModifier.id } })
    for (const modifier of productModifiers) {
      if(modifier.order === null){
        await modifier.update({ order: productModifiers.length }, { where: { id: modifier.id } })
      }
      if(modifier.order === (order - 1)) {
        await modifier.update({ order: order }, { where: { id: modifier.id }})
        break
      }
    }
  }
}
