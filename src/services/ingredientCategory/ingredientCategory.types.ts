export interface IngredientCategoryAttributes {
  id: number
  name: string
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface IngredienttCategory extends Required<IngredientCategoryAttributes> { }

export interface NewIngredientCategory extends Omit<IngredientCategoryAttributes, 'id'> { }
