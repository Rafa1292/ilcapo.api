import { traceFields } from "../../utils/genericTypes/traceFields.type"
import { ItemPrice } from "../itemPrice/itemPrice.types"
import { SaleItemProduct } from "../saleItemProduct/saleItemProduct.types"

export interface SaleItemAttributes {
  id: number
  name: string
  saleItemCategoryId: number
  pictureUrl: string
  prices: ItemPrice[]
  delete: boolean
  saleItemProducts?: SaleItemProduct[]
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface SaleItem extends Omit<SaleItemAttributes, keyof typeof traceFields> { }
