import { Transaction } from "sequelize";
import { UpgradeElementPriceModel } from "../../db/models/upgradeElementPrice.model";
import { toNewUpgradeElementPrice } from "../../factories/upgradeElementPrice.factory";
import { UpgradeElementPrice } from "./upgradeElementPrice.types";
import { getNow } from "../../utils/timeManager";

export const saveUpgradeElementPrice = async (
  upgradeElementPrice: UpgradeElementPrice,
  transaction: Transaction
): Promise<UpgradeElementPrice> => {
  const { id, ...rest } = upgradeElementPrice;
  const now = getNow()
  rest.createdAt = now
  rest.updatedAt = now
  const newItemPrice = await UpgradeElementPriceModel.create(rest, { transaction });
  return toNewUpgradeElementPrice(newItemPrice);
};

export const updateUpgradeElementPrice = async (
  upgradeElementPrice: Partial<UpgradeElementPrice>,
  id: number,
  transaction: Transaction
): Promise<UpgradeElementPrice | null> => {
  const now = getNow()
  upgradeElementPrice.updatedAt = now
  const updatedItemPrice = await UpgradeElementPriceModel.update(upgradeElementPrice, {
    where: {
      id: id,
    },
    transaction
  });
  return toNewUpgradeElementPrice(updatedItemPrice);
};

export const deleteUpgradeElementPrice = async (id: number, transaction: Transaction): Promise<void> => {
  await UpgradeElementPriceModel.destroy({ where: { id }, transaction });
}
