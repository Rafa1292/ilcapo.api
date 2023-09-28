import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface PreparationStepInputAttributes {
  id: number
  inputId: number
  preparationStepId: number
  quantity: number
  measureId: number
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}


export interface PreparationStepInput extends Omit<PreparationStepInputAttributes, keyof typeof traceFields> { }
