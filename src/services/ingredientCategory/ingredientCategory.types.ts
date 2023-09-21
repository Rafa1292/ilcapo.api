import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface IngredientCategoryAttributes {
  id: number
  name: string
  delete: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: number
  updatedBy: number
}


export interface IngredientCategory extends Omit<IngredientCategoryAttributes, keyof typeof traceFields> { }
