import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface ProviderAttributes {
  id: number
  name: string
  phone: number
  fixedExpense: boolean
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}


export interface Provider extends Omit<ProviderAttributes, keyof typeof traceFields> {}
