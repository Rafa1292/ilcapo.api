import { ModifierGroup } from '../modifierGroup/modifierGroup.types'

export interface ProductModifierAttributes {
  id: number
  productId: number
  modifierGroupId: number
  order: number
  price: number
  minSelect: number
  maxSelect: number
  priceByGroup: boolean
  modifierGroup: ModifierGroup
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ProductModifier extends Required<ProductModifierAttributes> { }

export interface NewProductModifier extends Omit<ProductModifierAttributes, 'id'> { }
