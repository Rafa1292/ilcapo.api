import { traceFields } from '../../utils/genericTypes/traceFields.type'
import { PreparationStepInput } from '../preparationStepInput/preparationStepInput.types'

export interface PreparationStepAttributes {
  id: number
  stepNumber: number
  description: string
  cost: number
  minutesOfPreparation: number
  ingredientId: number
  preparationStepInputs?: PreparationStepInput[]
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}


export interface PreparationStep extends Omit<PreparationStepAttributes, keyof typeof traceFields> { }
