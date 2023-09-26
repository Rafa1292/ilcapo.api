import { ItemPrice } from '../services/itemPrice/itemPrice.types'
import { getSaleItemsWithDeletedItems } from '../services/saleItem/saleItem.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const saleItems = await getSaleItemsWithDeletedItems()
  const saleItem = saleItems.find((saleItem) => saleItem.name.toLowerCase() === name.toLowerCase())
  if (saleItem !== null && saleItem !== undefined) {
    if (saleItem?.id !== id) {
      throw new Error('Este nombre de item de venta ya existe')
    }
  }
}

export const newSaleItemIsValid = async (saleItem: any): Promise<boolean> => {
  parseName(saleItem?.name)
  await validateUniqueName(saleItem?.name, saleItem?.id)
  return true
}

export const validatePrices = (prices: ItemPrice[]): void => {
if(prices === undefined || prices === null){
    throw new Error('Debe haber al menos un precio')
  }

  if(prices.length === 0){
    throw new Error('Debe haber al menos un precio')
  }
}
