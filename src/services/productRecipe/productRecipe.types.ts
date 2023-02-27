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

export interface ProductRecipe extends Required<ProductRecipeAttributes> { }

export interface NewProductRecipe extends Omit<ProductRecipeAttributes, 'id'> { }
