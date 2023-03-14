import { ProductModifier } from '../services/productModifier/productModifier.types'
import { toNewModifierGroup } from './modifierGroup.factory'

export const toNewProductModifier = async (productModifier: any): Promise<ProductModifier> => {
  return {
    id: productModifier.id,
    productId: productModifier.productId,
    modifierGroupId: productModifier.modifierGroupId,
    modifierGroup: (productModifier.modifierGroup === undefined) || (productModifier.modifierGroup === null) ? productModifier.modifierGroup : await toNewModifierGroup(productModifier.modifierGroup),
    createdBy: productModifier.createdBy,
    updatedBy: productModifier.updatedBy,
    createdAt: productModifier.createdAt,
    updatedAt: productModifier.updatedAt,
    delete: productModifier.delete
  }
}

export const toNewProductModifiers = async (productModifiers: any[]): Promise<ProductModifier[]> => {
  return await Promise.all(productModifiers.map(async (productModifier: any) => await toNewProductModifier(productModifier)))
}
