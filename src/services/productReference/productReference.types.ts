
export interface ProductReferenceAttributes {
  id: number
  productId: number
  modifierElementId: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ProductReference extends Required<ProductReferenceAttributes> { }

export interface NewProductReference extends Omit<ProductReferenceAttributes, 'id'> { }
