import { ProductReference } from '../productReference/productReference.types'

export interface ModifierElementAttributes {
  id: number
  name: string
  price: number
  quantity: number
  delete: boolean
  defaultRecipeId: number
  combinable: boolean
  numberOfParts: number
  combinableModifierGroupId: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ModifierElement extends Required<ModifierElementAttributes> { productReference?: ProductReference }

export interface NewModifierElement extends Omit<ModifierElementAttributes, 'id'> { }
