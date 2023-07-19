import { UpgradeElementPriceModel } from "../../db/models/upgradeElementPrice.model";
import { toNewUpgradeElementPrice } from "../../factories/upgradeElementPrice.factory";
import { NewUpgradeElementPrice, UpgradeElementPrice } from "./upgradeElementPrice.types";

export const saveUpgradeElementPrice = async (
  upgradeElementPrice: NewUpgradeElementPrice
): Promise<UpgradeElementPrice> => {
  const newItemPrice = await UpgradeElementPriceModel.create(upgradeElementPrice);
  return toNewUpgradeElementPrice(newItemPrice);
};

export const updateUpgradeElementPrice = async (
  upgradeElementPrice: Partial<UpgradeElementPrice>
): Promise<UpgradeElementPrice | null> => {
  const updatedItemPrice = await UpgradeElementPriceModel.update(upgradeElementPrice, {
    where: {
      id: upgradeElementPrice.id,
    },
  });
  return toNewUpgradeElementPrice(updatedItemPrice);
};
