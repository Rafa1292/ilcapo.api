import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface ProductRecipeAttributes {
  id: number
  modifierElementId: number
  productId: number
  recipeId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ProductRecipe extends Omit<ProductRecipeAttributes, keyof typeof traceFields> { }
