import { Brand, BrandAttributes } from './brand.types'
import { BrandModel } from '../../db/models/brand.model'
import { getNow } from '../../utils/timeManager'
import { validateBrand } from '../../factories/brand.factory'

export const getBrands = async (): Promise<Brand[]> => {
  const brandModels = await BrandModel.findAll({
    where: {
      delete: false,
    },
  })
  const brands: Brand[] = []
  for (const brandModel of brandModels) {
    brands.push(await validateBrand(brandModel))
  }
  return brands
}

export const getBrandById = async (id: number): Promise<Brand> => {
  const response = await BrandModel.findByPk(id)
  if (response === null) throw new Error('Brand not found')
  if (response.delete) throw new Error('Brand deleted')
  return await validateBrand(response)
}

export const saveBrand = async (brand: Brand): Promise<Brand> => {
  const { id, ...newBrand } = BrandModel.getBrand(brand, 0)
  return await BrandModel.create(newBrand)
}

export const updateBrand = async (
  brand: Partial<BrandAttributes>,
  id: number
): Promise<void> => {
  const updateBrand = BrandModel.getPartialBrand(brand, 0)
  await BrandModel.update(updateBrand, { where: { id } })
}

export const deleteBrand = async (id: number): Promise<void> => {
  await updateBrand({ delete: true }, id)
}

export const recoveryBrand = async (id: number): Promise<void> => {
  await updateBrand({ delete: false }, id)
}
