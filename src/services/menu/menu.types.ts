
export interface MenuAttributes {
  id: number
  name: string
  comissionPercentage: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Menu extends Required<MenuAttributes> { }

export interface NewMenu extends Omit<MenuAttributes, 'id'> { }
