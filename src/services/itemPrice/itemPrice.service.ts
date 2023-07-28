import { Transaction } from "sequelize";
import { ItemPriceModel } from "../../db/models/itemPrice.model";
import { toNewItemPrice } from "../../factories/itemPrice.factory";
import { ItemPrice } from "./itemPrice.types";

export const saveItemPrice = async (
  itemPrice: ItemPrice,
  transaction: Transaction
): Promise<ItemPrice> => {
  const {id, ...newItemPrice } = itemPrice;
  const currentItemPrice = await ItemPriceModel.create(newItemPrice, { transaction });
  return toNewItemPrice(currentItemPrice);
};

export const updateItemPrice = async ( itemPrice: ItemPrice, id: number, transaction: Transaction): Promise<ItemPrice | null> => {
console.log('-------update-------------')
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
