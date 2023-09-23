import { Transaction } from 'sequelize'
import { UpgradeElementPriceModel } from '../../db/models/upgradeElementPrice.model'
import { UpgradeElementPrice } from './upgradeElementPrice.types'

export const saveUpgradeElementPrice = async (
  upgradeElementPrice: UpgradeElementPrice,
  transaction: Transaction
): Promise<UpgradeElementPrice> => {
  const { id, ...rest } = UpgradeElementPriceModel.getUpgradeElementPrice(
    upgradeElementPrice,
    0
  )
  return await UpgradeElementPriceModel.create(rest, { transaction })
}

export const updateUpgradeElementPrice = async (
  upgradeElementPrice: Partial<UpgradeElementPrice>,
  id: number,
  transaction: Transaction
): Promise<Partial<UpgradeElementPrice> | null> => {
  const updatedUpgradeElementPrice = UpgradeElementPriceModel.getPartialUpgradeElementPrice(upgradeElementPrice,0)
  await UpgradeElementPriceModel.update(updatedUpgradeElementPrice, {
    where: {
      id: id,
    },
    transaction,
  })
  return upgradeElementPrice
}

export const deleteUpgradeElementPrice = async (
  id: number,
  transaction: Transaction
): Promise<void> => {
  await UpgradeElementPriceModel.destroy({ where: { id }, transaction })
}
