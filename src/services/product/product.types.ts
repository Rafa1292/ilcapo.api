import { traceFields } from '../../utils/genericTypes/traceFields.type'
import { ProductModifier } from '../productModifier/productModifier.types'

export interface ProductAttributes {
  id: number
  name: string
  pictureUrl: string
  allowsModify: boolean
  productModifiers: ProductModifier[]
  needsCommand: boolean
  active: boolean
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface Product extends Omit<ProductAttributes, keyof typeof traceFields> { }
