import { UpgradeElementPrice } from "../services/upgradeElementPrice/upgradeElementPrice.types";

export const toNewUpgradeElementPrice = async (upgradeElementPrice: any): Promise<UpgradeElementPrice> => {
  return {
    id: upgradeElementPrice.id,
    upgradeId: upgradeElementPrice.upgradeId,
    menuId: upgradeElementPrice.menuId,
    price: upgradeElementPrice.price,
    createdBy: upgradeElementPrice.createdBy,
    updatedBy: upgradeElementPrice.updatedBy,
    createdAt: upgradeElementPrice.createdAt,
    updatedAt: upgradeElementPrice.updatedAt,
    delete: upgradeElementPrice.delete,
  };
};

export const toNewUpgradeElementPrices = async (upgrades: any[]): Promise<UpgradeElementPrice[]> => {
  return await Promise.all(
    upgrades.map(async (upgrade) => {
      return await toNewUpgradeElementPrice(upgrade);
    })
  );
};
