import { traceFields } from "../../utils/genericTypes/traceFields.type"
import { Product } from "../product/product.types"

export interface SaleItemProductAttributes {
  id: number
  saleItemId: number
  productId: number
  quantity: number
  discount: number
  product?: Product
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface SaleItemProduct extends Omit<SaleItemProductAttributes, keyof typeof traceFields> { }
