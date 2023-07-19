import { ItemPriceModel } from "../../db/models/itemPrice.model";
import { toNewItemPrice } from "../../factories/itemPrice.factory";
import { NewItemPrice, ItemPrice } from "./itemPrice.types";

export const saveItemPrice = async (
  itemPrice: NewItemPrice
): Promise<ItemPrice> => {
  const newItemPrice = await ItemPriceModel.create(itemPrice);
  return toNewItemPrice(newItemPrice);
};

export const updateItemPrice = async (
  itemPrice: Partial<ItemPrice>
): Promise<ItemPrice | null> => {
  const updatedItemPrice = await ItemPriceModel.update(itemPrice, {
    where: {
      id: itemPrice.id,
    },
  });
  return toNewItemPrice(updatedItemPrice);
};
