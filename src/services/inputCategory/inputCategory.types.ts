export interface InputCategoryAttributes {
  id: number
  name: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface InputCategory extends Required<InputCategoryAttributes> { }
