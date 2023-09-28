import { traceFields } from '../../utils/genericTypes/traceFields.type'
import { Measure } from '../measure/measure.types'
import { PreparationStep } from '../preparationStep/preparationStep.types'

export interface IngredientAttributes {
  id: number
  name: string
  cost: number
  measureId: number
  presentation: number
  price: number
  ingredientCategoryId: number
  preparationSteps?: PreparationStep[]
  measure?: Measure
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}


export interface Ingredient extends Omit<IngredientAttributes, keyof typeof traceFields> { }
