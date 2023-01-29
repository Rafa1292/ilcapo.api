export interface IngredientAttributes {
  id: number
  name: string
  cost: number
  measureId: number
  presentation: number
  price: number
  ingredientCategoryId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Ingredient extends Required<IngredientAttributes> { }

export interface NewIngredient extends Omit<IngredientAttributes, 'id'> { }
