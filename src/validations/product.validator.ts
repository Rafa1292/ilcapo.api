import { getProductsWithDeletedItems } from '../services/product/product.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const products = await getProductsWithDeletedItems()
  const product = products.find((product) => product.name.toLowerCase() === name.toLowerCase())
  if (product !== null && product !== undefined) {
    if (product?.id !== id) {
      if (product.delete) {
        throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de productos borrados')
      }
      throw new Error('Este nombre de producto ya existe')
    }
  }
}

export const newProductIsValid = async (product: any): Promise<boolean> => {
  parseName(product?.name)
  await validateUniqueName(product?.name, product?.id)
  return true
}
