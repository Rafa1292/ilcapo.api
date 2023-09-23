import {
  SaleItemCategory,
  SaleItemCategoryAttributes,
} from './saleItemCategory.types'
import { SaleItemCategoryModel } from '../../db/models/saleItemCategory.model'
import { validateSaleItemCategory } from '../../factories/saleItemCategory.factory'
import { getNow } from '../../utils/timeManager'

export const getSaleItemCategories = async (): Promise<SaleItemCategory[]> => {
  return await SaleItemCategoryModel.findAll({
    where: {
      delete: false,
    },
    include: [
      {
        association: 'saleItems',
        include: [
          {
            association: 'saleItemProducts',
            include: [
              {
                association: 'product',
              },
            ],
          },
          'prices',
        ],
      },
    ],
  })
}

export const getSaleItemCategoriesWithActiveProducts = async (): Promise<
  SaleItemCategory[]
> => {
  const categories = await SaleItemCategoryModel.findAll({
    where: {
      delete: false,
    },
    include: [
      {
        association: 'saleItems',
        include: [
          {
            association: 'saleItemProducts',
            include: [
              {
                association: 'product',
                where: {
                  active: true,
                },
              },
            ],
          },
          'prices',
        ],
      },
    ],
  })

  const newCategories: SaleItemCategory[] = []

  categories.map((category) => {
    const newCategory = category.toJSON() as SaleItemCategory
    if (newCategory.saleItems === undefined) return
    newCategory.saleItems = newCategory.saleItems.filter((saleItem) => {
      if (saleItem.saleItemProducts === undefined) return false
      saleItem.saleItemProducts = saleItem.saleItemProducts.filter(
        (saleItemProduct) => {
          return saleItemProduct.product !== null
        }
      )
      return saleItem.saleItemProducts.length > 0
    })
    if (newCategory.saleItems.length > 0) {
      newCategories.push(newCategory)
    }
  })

  return newCategories
}

export const getSaleItemCategoriesWithDeletedItems = async (): Promise<
  SaleItemCategory[]
> => {
  return await SaleItemCategoryModel.findAll()
}

export const getSaleItemCategoryById = async (
  id: number
): Promise<SaleItemCategory> => {
  const saleItemCategory = await SaleItemCategoryModel.findByPk(id)
  if (saleItemCategory === null) throw new Error('SaleItemCategory not found')
  if (saleItemCategory.delete) throw new Error('SaleItemCategory deleted')
  return saleItemCategory
}

export const saveSaleItemCategory = async (
  saleItemCategory: SaleItemCategory
): Promise<SaleItemCategory> => {
  const { id, ...rest } = SaleItemCategoryModel.getSaleItemCategory(
    saleItemCategory,
    0
  )
  return await SaleItemCategoryModel.create(rest)
}

export const updateSaleItemCategory = async (
  saleItemCategory: Partial<SaleItemCategoryAttributes>,
  id: number
): Promise<void> => {
  const updateSaleItemCategory =
    SaleItemCategoryModel.getPartialSaleItemCategory(saleItemCategory, 0)
  await SaleItemCategoryModel.update(updateSaleItemCategory, { where: { id } })
}

export const deleteSaleItemCategory = async (id: number): Promise<void> => {
  await updateSaleItemCategory({ delete: true }, id)
}

export const recoverySaleItemCategory = async (id: number): Promise<void> => {
  await updateSaleItemCategory({ delete: false }, id)
}
