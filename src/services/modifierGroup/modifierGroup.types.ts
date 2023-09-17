import { ModifierElement } from '../modifierElement/modifierElement.types'

export interface ModifierGroupAttributes {
  id: number
  name: string
  showLabel: boolean
  delete: boolean
  elements?: ModifierElement[]
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ModifierGroup extends Required<ModifierGroupAttributes> { }

export interface NewModifierGroup extends Omit<ModifierGroupAttributes, 'id'> { }
