import { traceFields } from "../../utils/genericTypes/traceFields.type"
import { SaleItem } from "../saleItem/saleItem.types"

export interface SaleItemCategoryAttributes {
  id: number
  name: string
  delete: boolean
  saleItems?: SaleItem[]
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface SaleItemCategory extends Omit<SaleItemCategoryAttributes, keyof typeof traceFields> { }
