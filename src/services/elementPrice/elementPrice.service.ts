import { Transaction } from 'sequelize'
import { ElementPriceModel } from '../../db/models/elementPrice.model'
import { ElementPrice } from './elementPrice.types'

export const saveElementPrice = async (
  elementPrice: ElementPrice,
  transaction: Transaction
): Promise<ElementPrice> => {
  const { id, ...rest } = ElementPriceModel.getElementPrice(elementPrice, 0)
  return await ElementPriceModel.create(rest, { transaction })
}

export const updateElementPrice = async (
  elementPrice: Partial<ElementPrice>,
  id: number,
  transaction: Transaction
): Promise<ElementPrice | null> => {
  const updatedElementPrice = ElementPriceModel.getPartialElementPrice(
    elementPrice,
    0
  )
  await ElementPriceModel.update(elementPrice, {
    where: {
      id: id,
    },
    transaction,
  })
  // si aparec un error revisar devolucion
  return ElementPriceModel.findByPk(id, { transaction })
}

export const deleteElementPrice = async (
  id: number,
  transaction: Transaction
): Promise<void> => {
  await ElementPriceModel.destroy({ where: { id }, transaction })
}
