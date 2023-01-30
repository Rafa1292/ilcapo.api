export interface PreparationStepAttributes {
  id: number
  stepNumber: number
  description: string
  cost: number
  minutesOfPreparation: number
  ingredientId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface PreparationStep extends Required<PreparationStepAttributes> { }

export interface NewPreparationStep extends Omit<PreparationStepAttributes, 'id'> { }
