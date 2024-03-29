import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface InventoryInputAttributes {
  id: number
  inventoryId: number
  inputId: number
  initialQuantity: number
  addedQuantity: number
  finalQuantity: number
  measureId: number
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface InventoryInput extends Omit<InventoryInputAttributes, keyof typeof traceFields> { }
