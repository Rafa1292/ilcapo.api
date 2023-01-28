export interface ProviderAttributes {
  id: number
  name: string
  phone: number
  fixedExpense: boolean
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Provider extends Required<ProviderAttributes> {}

export interface NewProvider extends Omit<ProviderAttributes, 'id'> {}
