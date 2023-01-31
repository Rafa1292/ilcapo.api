export interface ModifierElementAttributes {
  id: number
  name: string
  productId: number
  price: number
  quantity: number
  measureId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ModifierElement extends Required<ModifierElementAttributes> { }

export interface NewModifierElement extends Omit<ModifierElementAttributes, 'id'> { }
