import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface ItemPriceAttributes {
    id: number
    itemId: number
    menuId: number
    price: number
    delete: boolean
    createdAt?: string
    updatedAt?: string
    createdBy?: number
    updatedBy?: number
  }
  
  
  export interface ItemPrice extends Omit<ItemPriceAttributes, keyof typeof traceFields> { }
  