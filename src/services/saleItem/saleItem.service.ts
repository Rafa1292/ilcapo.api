import { SaleItem, NewSaleItem } from './saleItem.types'
import { SaleItemModel } from '../../db/models/saleItem.model'
import { toNewSaleItem } from '../../factories/saleItem.factory'

export const getSaleItems = async (): Promise<SaleItem[]> => {
  return await SaleItemModel.findAll(
    {
      where: {
        delete: false
      }
    }
  )
}

export const getSaleItemsWithDeletedItems = async (): Promise<SaleItem[]> => {
  return await SaleItemModel.findAll()
}

export const getSaleItemById = async (id: number): Promise<SaleItem> => {
  const response = await SaleItemModel.findByPk(id)
  if (response === null) throw new Error('SaleItem not found')
  if (response.delete) throw new Error('SaleItem deleted')
  return await toNewSaleItem(response)
}

export const saveSaleItem = async (provider: NewSaleItem): Promise<void> => {
  await SaleItemModel.create(provider)
}

export const updateSaleItem = async (saleItem: Partial<SaleItem>, id: number): Promise<void> => {
  await SaleItemModel.update(saleItem, { where: { id } })
}

export const deleteSaleItem = async (id: number): Promise<void> => {
  const saleItem = await getSaleItemById(id)
  saleItem.delete = true
  await updateSaleItem(saleItem, id)
}

export const recoverySaleItem = async (id: number): Promise<void> => {
  const saleItem = await getSaleItemById(id)
  saleItem.delete = false
  await updateSaleItem(saleItem, id)
}
