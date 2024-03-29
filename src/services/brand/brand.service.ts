import { Brand, BrandAttributes } from './brand.types'
import { BrandModel } from '../../db/models/brand.model'

export const getBrands = async (): Promise<Brand[]> => {
  const brandModels = await BrandModel.findAll({
    where: {
      delete: false,
    },
  })

  return brandModels
}

export const getBrandByName = async (name: string, id: number): Promise<Brand | undefined> => {
  const objs = await BrandModel.findAll({})
  const obj = objs.find((tmp: Brand) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })
  return obj
}

export const getBrandById = async (id: number): Promise<Brand> => {
  const brand = await BrandModel.findByPk(id)
  if (brand === null) throw new Error('Brand not found')
  if (brand.delete) throw new Error('Brand deleted')
  return brand
}

export const saveBrand = async (brand: Brand): Promise<Brand> => {
  const { id, ...newBrand } = BrandModel.getBrand(brand, 0)
  console.log(newBrand)
  return await BrandModel.create(newBrand)
}

export const updateBrand = async (brand: Partial<BrandAttributes>, id: number): Promise<void> => {
  const updateBrand = BrandModel.getPartialBrand(brand, 0)
  await BrandModel.update(updateBrand, { where: { id } })
}

export const deleteBrand = async (id: number): Promise<void> => {
  await updateBrand({ delete: true }, id)
}

export const recoveryBrand = async (id: number): Promise<void> => {
  await updateBrand({ delete: false }, id)
}
