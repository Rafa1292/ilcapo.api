import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface ProductReferenceAttributes {
  id: number
  productId: number
  modifierElementId: number
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface ProductReference extends Omit<ProductReferenceAttributes, keyof typeof traceFields> { }
