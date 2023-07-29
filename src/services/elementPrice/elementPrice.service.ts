import { Transaction } from "sequelize";
import { ElementPriceModel } from "../../db/models/elementPrice.model";
import { toNewElementPrice } from "../../factories/elementPrice.factory";
import { ElementPrice } from "./elementPrice.types";

export const saveElementPrice = async (
  elementPrice: ElementPrice,
  transaction: Transaction
): Promise<ElementPrice> => {
  const { id, ...rest } = elementPrice;
  const currentElementPrice = await ElementPriceModel.create(rest, { transaction });
  return toNewElementPrice(currentElementPrice);
};

export const updateElementPrice = async (
  elementPrice: Partial<ElementPrice>,
  id: number,
  transaction: Transaction
): Promise<ElementPrice | null> => {
  const updatedElementPrice = await ElementPriceModel.update(elementPrice, {
    where: {
      id: id,
    },
    transaction
  });
  return toNewElementPrice(updatedElementPrice);
};

export const deleteElementPrice = async (id: number, transaction: Transaction): Promise<void> => {
  console.log('-----destroy--------')
  await ElementPriceModel.destroy({ where: { id }, transaction });
}
