export interface ProductAttributes {
  id: number
  name: string
  price: number
  description: string
  pictureUrl: string
  allowsModify: boolean
  recipeId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Product extends Required<ProductAttributes> { }

export interface NewProduct extends Omit<ProductAttributes, 'id'> { }
