import { SaleItem } from "../saleItem/saleItem.types"

export interface SaleItemCategoryAttributes {
  id: number
  name: string
  delete: boolean
  saleItems?: SaleItem[]
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface SaleItemCategory extends Required<SaleItemCategoryAttributes> { }

export interface NewSaleItemCategory extends Omit<SaleItemCategoryAttributes, 'id'> { }
