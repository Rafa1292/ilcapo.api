import { Brand } from '../services/brand/brand.types'

export const toNewBrand = async (brand: any): Promise<Brand> => {
  return {
    id: brand.id,
    name: brand.name,
    createdBy: brand.createdBy,
    updatedBy: brand.updatedBy,
    createdAt: brand.createdAt,
    updatedAt: brand.updatedAt,
    delete: brand.delete
  }
}
