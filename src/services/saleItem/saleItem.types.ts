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
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface SaleItem extends Required<SaleItemAttributes> { }

export interface NewSaleItem extends Omit<SaleItemAttributes, 'id'> { }
