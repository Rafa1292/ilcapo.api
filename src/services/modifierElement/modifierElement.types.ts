import { traceFields } from '../../utils/genericTypes/traceFields.type'
import { ElementPrice } from '../elementPrice/elementPrice.types'
import { ModifierElementUpgrade } from '../modifierElementUpgrade/modifierElementUpgrade.types'
import { ProductReference } from '../productReference/productReference.types'

export interface ModifierElementAttributes {
  id: number
  name: string
  delete: boolean
  defaultRecipeId: number
  combinable: boolean
  prices?: ElementPrice[]
  combinableModifierGroupId: number
  modifierUpgrade?: ModifierElementUpgrade
  modifierGroupId: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}


export interface ModifierElement extends Omit<ModifierElementAttributes, keyof typeof traceFields> { productReference?: ProductReference, price?: number }
