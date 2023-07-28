import { ItemPrice } from "../itemPrice/itemPrice.types"

export interface SaleItemAttributes {
  id: number
  name: string
  saleItemCategoryId: number
  description: string
  pictureUrl: string
  prices: ItemPrice[]
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface SaleItem extends Required<SaleItemAttributes> { }

export interface NewSaleItem extends Omit<SaleItemAttributes, 'id'> { }
