import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface ExcludeElementAttributes {
  id: number
  productModifierId: number
  modifierElementId: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ExcludeElement extends Omit<ExcludeElementAttributes, keyof typeof traceFields> { }
