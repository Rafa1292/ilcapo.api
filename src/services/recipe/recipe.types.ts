export interface RecipeAttributes {
  id: number
  description: string
  cost: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Recipe extends Required<RecipeAttributes> { }

export interface NewRecipe extends Omit<RecipeAttributes, 'id'> { }
