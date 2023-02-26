export interface ModifierElementAttributes {
  id: number
  name: string
  price: number
  quantity: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ModifierElement extends Required<ModifierElementAttributes> { }

export interface NewModifierElement extends Omit<ModifierElementAttributes, 'id'> { }
