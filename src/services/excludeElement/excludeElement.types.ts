import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface ExcludeElementAttributes {
  id: number
  productModifierId: number
  modifierElementId: number
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface ExcludeElement extends Omit<ExcludeElementAttributes, keyof typeof traceFields> { }
