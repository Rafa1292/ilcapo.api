import { ModifierElement } from '../modifierElement/modifierElement.types'

export interface GroupElementAttributes {
  id: number
  modifierGroupId: number
  modifierElementId: number
  delete: boolean
  modifierElement?: ModifierElement
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface GroupElement extends Required<GroupElementAttributes> { }

export interface NewGroupElement extends Omit<GroupElementAttributes, 'id'> { }
