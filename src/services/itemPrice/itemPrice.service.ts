import { Transaction } from "sequelize";
import { ItemPriceModel } from "../../db/models/itemPrice.model";
import { toNewItemPrice } from "../../factories/itemPrice.factory";
import { ItemPrice } from "./itemPrice.types";
import { getNow } from "../../utils/timeManager";

export const saveItemPrice = async (
  itemPrice: ItemPrice,
  transaction: Transaction
): Promise<ItemPrice> => {
  const {id, ...newItemPrice } = itemPrice;
  const now = getNow()
  newItemPrice.createdAt = now
  newItemPrice.updatedAt = now
  const currentItemPrice = await ItemPriceModel.create(newItemPrice, { transaction });
  return toNewItemPrice(currentItemPrice);
};

export const updateItemPrice = async ( itemPrice: ItemPrice, id: number, transaction: Transaction): Promise<ItemPrice | null> => {
  const now = getNow()
  itemPrice.updatedAt = now
  const updatedItemPrice = await ItemPriceModel.update(itemPrice, {
    where: {
      id: id,
    },
    transaction
  });
  return toNewItemPrice(updatedItemPrice);
};

export const deleteItemPrice = async (id: number, transaction: Transaction): Promise<void> => {
  await ItemPriceModel.destroy({ where: { id }, transaction });
}
