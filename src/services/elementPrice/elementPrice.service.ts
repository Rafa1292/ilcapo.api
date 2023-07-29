import { Transaction } from "sequelize";
import { ElementPriceModel } from "../../db/models/elementPrice.model";
import { toNewElementPrice } from "../../factories/elementPrice.factory";
import { NewElementPrice, ElementPrice } from "./elementPrice.types";

export const saveElementPrice = async (
  elementPrice: NewElementPrice,
  transaction: Transaction
): Promise<ElementPrice> => {
  const newElementPrice = await ElementPriceModel.create(elementPrice, { transaction });
  return toNewElementPrice(newElementPrice);
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
  await ElementPriceModel.destroy({ where: { id }, transaction });
}
