import { traceFields } from '../../utils/genericTypes/traceFields.type'
import { RecipeStep } from '../recipeStep/recipeStep.types'

export interface RecipeAttributes {
  id: number
  name: string
  cost: number
  recipeSteps: RecipeStep[]
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}


export interface Recipe extends Omit<RecipeAttributes, keyof typeof traceFields> { }
