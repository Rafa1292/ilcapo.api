import { SaleItemProductModel } from '../../db/models/saleItemProduct.model'
import { SaleItemProduct, NewSaleItemProduct } from './saleItemProduct.types'

export const saveSaleItemProduct = async (saleItemProduct: NewSaleItemProduct): Promise<SaleItemProduct> => {
  return await SaleItemProductModel.create(saleItemProduct)
}

export const updateSaleItemProduct = async (saleItemProduct: Partial<SaleItemProduct>, id: number): Promise<void> => {
  await SaleItemProductModel.update(saleItemProduct, { where: { id } })
}

export const deleteSaleItemProduct = async (id: number): Promise<void> => {
  await SaleItemProductModel.destroy({ where: { id } })
}
