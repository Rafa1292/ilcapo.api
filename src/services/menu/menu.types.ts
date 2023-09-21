import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface MenuAttributes {
  id: number
  name: string
  comissionPercentage: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}


export interface Menu extends Omit<MenuAttributes, keyof typeof traceFields> { }
