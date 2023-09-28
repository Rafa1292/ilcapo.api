import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface InputCategoryAttributes {
  id: number
  name: string
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}


export interface InputCategory extends Omit<InputCategoryAttributes, keyof typeof traceFields> { }
