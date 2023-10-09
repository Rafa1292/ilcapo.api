import { SaleItem, SaleItemAttributes } from './saleItem.types'
import { SaleItemModel } from '../../db/models/saleItem.model'
import { Transaction } from 'sequelize'
import { deleteItemPrice, saveItemPrice, updateItemPrice } from '../itemPrice/itemPrice.service'
import { ItemPrice } from '../itemPrice/itemPrice.types'

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
  const saleItem = await SaleItemModel.findByPk(id, { include: ['prices'] })
  if (saleItem === null) throw new Error('SaleItem not found')
  if (saleItem.delete) throw new Error('SaleItem deleted')
  return saleItem
}

export const saveSaleItem = async (saleItem: SaleItem): Promise<void> => {
  const transaction = await SaleItemModel.sequelize?.transaction()
  if (!transaction) throw new Error('Transaction not found')
  try {
    const { id, ...rest } = SaleItemModel.getSaleItem(saleItem, 0)
    const saleItemModel = await SaleItemModel.create(rest, { transaction })
    const itemId = saleItemModel.id
    await savePrices(itemId, saleItem.prices, transaction)
    await transaction?.commit()
  } catch (error) {
    await transaction?.rollback()
    throw error
  }
}

export const getSaleItemByName = async (name: string, id: number): Promise<SaleItem | undefined> => {
  const objs = await SaleItemModel.findAll({})
  const obj = objs.find((tmp: SaleItem) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })
  return obj
}


export const updateSaleItem = async (saleItem: Partial<SaleItemAttributes>, id: number ): Promise<void> => {
  const transaction = await SaleItemModel.sequelize?.transaction()
  if (!transaction) throw new Error('Transaction not found')
  try {
    const updateSaleItem = await SaleItemModel.getPartialSaleItem(saleItem, 0)
    await SaleItemModel.update(updateSaleItem, { where: { id }, transaction })
    const { prices, ...currentSaleItem } = await getSaleItemById(id)
    const pricesToUpdate = saleItem.prices?.filter(
      (price) => prices?.some((p) => p.id === price.id)
    ) || []
    const pricesToRemove = prices?.filter(
      (price) => !saleItem.prices?.some((p) => p.id === price.id)
    )
    const pricesToSave = saleItem.prices?.filter(
      (price) => price.id === 0) || []
    

    if (pricesToUpdate.length > 0) await updatePrices({...currentSaleItem, prices: pricesToUpdate}, transaction)
    if (pricesToRemove.length > 0) await removePrices({...currentSaleItem, prices: pricesToRemove}, transaction)
    if (pricesToSave?.length > 0) await savePrices(id, pricesToSave, transaction)

    await transaction.commit()
  } catch (error) {
    await transaction?.rollback()
    throw error
  }
}

const savePrices = async (saleItemId: number, prices: ItemPrice[], transaction: Transaction): Promise<void> => {
  console.log(saleItemId)
  for (const price of prices) {
    // console.log('---------------------------------------')
    await saveItemPrice({...price, itemId: saleItemId}, transaction)
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
  await updateSaleItem({delete: true}, id)
}

export const recoverySaleItem = async (id: number): Promise<void> => {
  await SaleItemModel.update({delete: false}, { where: { id } })
}
