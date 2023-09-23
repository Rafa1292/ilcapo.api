import { SaleItemProductModel } from '../../db/models/saleItemProduct.model'
import { SaleItemProduct, SaleItemProductAttributes } from './saleItemProduct.types'

export const saveSaleItemProduct = async (saleItemProduct: SaleItemProduct): Promise<SaleItemProduct> => {
  const { id, ...rest } = SaleItemProductModel.getSaleItemProduct(saleItemProduct, 0)
  return await SaleItemProductModel.create(rest)
}

export const updateSaleItemProduct = async (saleItemProduct: Partial<SaleItemProductAttributes>, id: number): Promise<void> => {
  const updatedSaleItemProduct = SaleItemProductModel.getPartialSaleItemProduct(saleItemProduct, id)
  await SaleItemProductModel.update(updatedSaleItemProduct, { where: { id } })
}

export const deleteSaleItemProduct = async (id: number): Promise<void> => {
  await SaleItemProductModel.destroy({ where: { id } })
}
