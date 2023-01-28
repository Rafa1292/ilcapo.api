export interface InputAttributes {
  id: number
  name: string
  lowerPrice: number
  currentPrice: number
  upperPrice: number
  lastPrice: number
  expectedPrice: number
  stock: number
  presentation: number
  suggestedStock: number
  currentProviderId: number
  measureId: number
  inputCategoryId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Input extends Required<InputAttributes> { }

export interface NewInput extends Omit<InputAttributes, 'id'> { }
