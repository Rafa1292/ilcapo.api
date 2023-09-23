import { Transaction } from "sequelize";
import { ItemPriceModel } from "../../db/models/itemPrice.model";
import { ItemPrice } from "./itemPrice.types";

export const saveItemPrice = async (
  itemPrice: ItemPrice,
  transaction: Transaction
): Promise<ItemPrice> => {
  const {id, ...newItemPrice } = ItemPriceModel.getItemPrice(itemPrice, 0);
  return await ItemPriceModel.create(newItemPrice, { transaction });
};

export const updateItemPrice = async ( itemPrice: ItemPrice, id: number, transaction: Transaction): Promise<ItemPrice | null> => {
  const updateItemPrice = ItemPriceModel.getPartialItemPrice(itemPrice, id);
   await ItemPriceModel.update(updateItemPrice, {
    where: {
      id: id,
    },
    transaction
  });
  return ItemPriceModel.findByPk(id, { transaction });
};

export const deleteItemPrice = async (id: number, transaction: Transaction): Promise<void> => {
  await ItemPriceModel.destroy({ where: { id }, transaction });
}
