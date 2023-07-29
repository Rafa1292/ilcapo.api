import { ElementPrice } from '../elementPrice/elementPrice.types'
import { ModifierElementUpgrade } from '../modifierElementUpgrade/modifierElementUpgrade.types'
import { ProductReference } from '../productReference/productReference.types'

export interface ModifierElementAttributes {
  id: number
  name: string
  quantity: number
  delete: boolean
  defaultRecipeId: number
  combinable: boolean
  numberOfParts: number
  prices: ElementPrice[]
  combinableModifierGroupId: number
  modifierUpgrade: ModifierElementUpgrade
  modifierGroupId: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ModifierElement extends Required<ModifierElementAttributes> { productReference?: ProductReference }

export interface NewModifierElement extends Omit<ModifierElementAttributes, 'id'> { }
