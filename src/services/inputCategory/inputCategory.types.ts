export interface InputCategoryAttributes {
  id: number
  name: string
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface InputCategory extends Required<InputCategoryAttributes> { }

export interface NewInputCategory extends Omit<InputCategoryAttributes, 'id'> { }
