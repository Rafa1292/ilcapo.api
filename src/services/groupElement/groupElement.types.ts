export interface GroupElementAttributes {
  id: number
  modifierGroupId: number
  modifierElementId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface GroupElement extends Required<GroupElementAttributes> { }

export interface NewGroupElement extends Omit<GroupElementAttributes, 'id'> { }
