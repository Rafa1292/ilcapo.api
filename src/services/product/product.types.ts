import { ProductModifier } from '../productModifier/productModifier.types'

export interface ProductAttributes {
  id: number
  name: string
  price: number
  description: string
  pictureUrl: string
  allowsModify: boolean
  productModifiers: ProductModifier[]
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Product extends Required<ProductAttributes> { }

export interface NewProduct extends Omit<ProductAttributes, 'id'> { }
