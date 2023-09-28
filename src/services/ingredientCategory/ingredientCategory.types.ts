import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface IngredientCategoryAttributes {
  id: number
  name: string
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy: number
  updatedBy: number
}


export interface IngredientCategory extends Omit<IngredientCategoryAttributes, keyof typeof traceFields> { }
