import { ItemPrice } from "../services/itemPrice/itemPrice.types";

export const toNewItemPrice = async (itemPrice: any): Promise<ItemPrice> => {
  return {
    id: itemPrice.id,
    itemId: itemPrice.itemId,
    menuId: itemPrice.menuId,
    price: itemPrice.price,
    createdBy: itemPrice.createdBy,
    updatedBy: itemPrice.updatedBy,
    createdAt: itemPrice.createdAt,
    updatedAt: itemPrice.updatedAt,
    delete: itemPrice.delete,
  };
};

export const toNewItemPrices = async (items: any[]): Promise<ItemPrice[]> => {
  return await Promise.all(
    items.map(async (item) => {
      return await toNewItemPrice(item);
    })
  );
};
