export interface PreparationStepInputAttributes {
  id: number
  inputId: number
  preparationStepId: number
  quantity: number
  measureId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface PreparationStepInput extends Required<PreparationStepInputAttributes> { }

export interface NewPreparationStepInput extends Omit<PreparationStepInputAttributes, 'id'> { }
