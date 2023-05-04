import { SaleItemCategory, NewSaleItemCategory } from './saleItemCategory.types'
import { SaleItemCategoryModel } from '../../db/models/saleItemCategory.model'
import { toNewSaleItemCategory } from '../../factories/saleItemCategory.factory'

export const getSaleItemCategories = async (): Promise<SaleItemCategory[]> => {
  return await SaleItemCategoryModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'saleItems',
          include: [
            {
              association: 'saleItemProducts',
              include: [
                {
                  association: 'product'
                }
              ]
            }
          ]
        }
      ]
    }
  )
}

export const getSaleItemCategoriesWithDeletedItems = async (): Promise<SaleItemCategory[]> => {
  return await SaleItemCategoryModel.findAll()
}

export const getSaleItemCategoryById = async (id: number): Promise<SaleItemCategory> => {
  const response = await SaleItemCategoryModel.findByPk(id)
  if (response === null) throw new Error('SaleItemCategory not found')
  if (response.delete) throw new Error('SaleItemCategory deleted')
  return await toNewSaleItemCategory(response)
}

export const saveSaleItemCategory = async (saleItemCategory: NewSaleItemCategory): Promise<SaleItemCategory> => {
  return await SaleItemCategoryModel.create(saleItemCategory)
}

export const updateSaleItemCategory = async (saleItemCategory: Partial<SaleItemCategory>, id: number): Promise<void> => {
  await SaleItemCategoryModel.update(saleItemCategory, { where: { id } })
}

export const deleteSaleItemCategory = async (id: number): Promise<void> => {
  const saleItemCategory = await getSaleItemCategoryById(id)
  saleItemCategory.delete = true
  await updateSaleItemCategory(saleItemCategory, id)
}

export const recoverySaleItemCategory = async (id: number): Promise<void> => {
  const saleItemCategory = await getSaleItemCategoryById(id)
  saleItemCategory.delete = false
  await updateSaleItemCategory(saleItemCategory, id)
}
