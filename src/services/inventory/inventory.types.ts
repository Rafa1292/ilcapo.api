import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface InventoryAttributes {
  id: number
  initialValue: number
  finalValue: number
  addedValue: number
  initialDate: Date
  finalDate: Date
  investedPercentage: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Inventory extends Omit<InventoryAttributes, keyof typeof traceFields> { }
