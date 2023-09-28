import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface InputAttributes {
  id: number
  name: string
  lowerPrice: number
  currentPrice: number
  upperPrice: number
  lastPrice: number
  expectedPrice: number
  stock: number
  presentation: number
  suggestedStock: number
  currentProviderId: number
  measureId: number
  inputCategoryId: number
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}


export interface Input extends Omit<InputAttributes, keyof typeof traceFields> { }
