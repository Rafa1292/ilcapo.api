import { SaleItem, NewSaleItem } from './saleItem.types'
import { SaleItemModel } from '../../db/models/saleItem.model'
import { toNewSaleItem } from '../../factories/saleItem.factory'
import { Transaction } from 'sequelize'
import { deleteItemPrice, saveItemPrice, updateItemPrice } from '../itemPrice/itemPrice.service'

export const getSaleItems = async (): Promise<SaleItem[]> => {
  return await SaleItemModel.findAll({
    where: {
      delete: false,
    },
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
  })
}

export const getSaleItemsWithDeletedItems = async (): Promise<SaleItem[]> => {
  return await SaleItemModel.findAll()
}

export const getSaleItemById = async (id: number): Promise<SaleItem> => {
  const response = await SaleItemModel.findByPk(id, { include: ['prices'] })
  if (response === null) throw new Error('SaleItem not found')
  if (response.delete) throw new Error('SaleItem deleted')
  return await toNewSaleItem(response)
}

export const saveSaleItem = async (saleItem: NewSaleItem): Promise<void> => {
  const transaction = await SaleItemModel.sequelize?.transaction()
  if (!transaction) throw new Error('Transaction not found')
  try {
    const newSaleItem = await SaleItemModel.create(saleItem, { transaction })
    await savePrices({ id: newSaleItem.id, prices: saleItem.prices } as SaleItem, transaction)
    await transaction?.commit()
  } catch (error) {
    await transaction?.rollback()
    throw error
  }
}

export const updateSaleItem = async (saleItem: Partial<SaleItem>, id: number ): Promise<void> => {
  const transaction = await SaleItemModel.sequelize?.transaction()
  if (!transaction) throw new Error('Transaction not found')
  try {
    await SaleItemModel.update(saleItem, { where: { id }, transaction })
    const { prices, ...currentSaleItem } = await getSaleItemById(id)
    const pricesToUpdate = prices.filter(
      (price) => !saleItem.prices?.some((p) => p.id === price.id)
    )
    const pricesToRemove = prices.filter(
      (price) => !saleItem.prices?.some((p) => p.id === price.id)
    )
    const pricesToSave = saleItem.prices?.filter(
      (price) => price.id === 0) || []

    if (pricesToUpdate.length > 0) await updatePrices({...currentSaleItem, prices: pricesToUpdate}, transaction)
    if (pricesToRemove.length > 0) await removePrices({...currentSaleItem, prices: pricesToRemove}, transaction)
    if (pricesToSave?.length > 0) await savePrices({...currentSaleItem, prices: pricesToSave}, transaction)

    await transaction.commit()
  } catch (error) {
    await transaction?.rollback()
    throw error
  }
}

const savePrices = async (saleItem: SaleItem, transaction: Transaction): Promise<void> => {
  // console.log('---------------------------------------')
  // console.log(saleItem)
  for (const price of saleItem.prices) {
    // console.log('---------------------------------------')
    // console.log(saleItem)
    await saveItemPrice({...price, itemId: saleItem.id}, transaction)
  }
}

const updatePrices = async (saleItem: SaleItem, transaction: Transaction): Promise<void> => {
  
  for (const price of saleItem.prices) {
    await updateItemPrice({...price, itemId: saleItem.id}, price.id, transaction)
  }
}

const removePrices = async (saleItem: SaleItem, transaction: Transaction): Promise<void> => {
  for (const price of saleItem.prices) {
    await deleteItemPrice(price.id, transaction)
  }
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
