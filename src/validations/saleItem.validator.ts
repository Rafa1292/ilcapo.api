import { getSaleItemsWithDeletedItems } from '../services/saleItem/saleItem.service'
import { SaleItem } from '../services/saleItem/saleItem.types'
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
      if (saleItem.delete) {
        throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de items de venta borradas')
      }
      throw new Error('Este nombre de item de venta ya existe')
    }
  }
}

export const newSaleItemIsValid = async (saleItem: any): Promise<boolean> => {
  parseName(saleItem?.name)
  await validateUniqueName(saleItem?.name, saleItem?.id)
  validatePrices(saleItem)
  return true
}

const validatePrices = (saleItem: SaleItem): void => {
if(saleItem.prices === undefined || saleItem.prices === null){
    throw new Error('Debe haber al menos un precio')
  }

  if(saleItem.prices.length === 0){
    throw new Error('Debe haber al menos un precio')
  }
}
