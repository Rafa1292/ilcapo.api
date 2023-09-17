
export interface ExcludeElementAttributes {
  id: number
  productModifierId: number
  modifierElementId: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ExcludeElement extends Required<ExcludeElementAttributes> { }

export interface NewExcludeElement extends Omit<ExcludeElementAttributes, 'id'> { }
