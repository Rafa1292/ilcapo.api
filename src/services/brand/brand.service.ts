import { Brand, NewBrand } from './brand.types'
import { BrandModel } from '../../db/models/brand.model'
import { toNewInputCategory } from '../../factories/inputCategory.factory'
import { getNow } from '../../utils/timeManager'

export const getBrands = async (): Promise<Brand[]> => {
  return await BrandModel.findAll(
    {
      where: {
        delete: false
      }
    }
  )
}

export const getBrandById = async (id: number): Promise<Brand> => {
  const response = await BrandModel.findByPk(id)
  if (response === null) throw new Error('Brand not found')
  if (response.delete) throw new Error('Brand deleted')
  return await toNewInputCategory(response)
}

export const saveBrand = async (brand: NewBrand): Promise<Brand> => {
  const now = getNow()
  brand.createdAt = now
  brand.updatedAt = now
  return await BrandModel.create(brand)
}

export const updateBrand = async (brand: Partial<Brand>, id: number): Promise<void> => {
  const now = getNow()
  brand.updatedAt = now
  await BrandModel.update(brand, { where: { id } })
}

export const deleteInputCategory = async (id: number): Promise<void> => {
  const brand = await getBrandById(id)
  const now = getNow()
  brand.updatedAt = now
  brand.delete = true
  await updateBrand(brand, id)
}

export const recoveryInputCategory = async (id: number): Promise<void> => {
  const brand = await getBrandById(id)
  const now = getNow()
  brand.updatedAt = now
  brand.delete = false
  await updateBrand(brand, id)
}
