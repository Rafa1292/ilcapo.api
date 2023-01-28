export interface InventoryInputAttributes {
  id: number
  inventoryId: number
  inputId: number
  initialQuantity: number
  addedQuantity: number
  finalQuantity: number
  measureId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface InventoryInput extends Required<InventoryInputAttributes> { }
