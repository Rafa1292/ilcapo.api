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

export interface Inventory extends Required<InventoryAttributes> { }
