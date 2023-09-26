import { traceFields } from '../../utils/genericTypes/traceFields.type'
import { ModifierGroup } from '../modifierGroup/modifierGroup.types'

export interface ProductModifierAttributes {
  id: number
  order: number
  modifierGroupId: number
  productId: number
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

export interface ProductModifier extends Omit<ProductModifierAttributes, keyof typeof traceFields> { }
