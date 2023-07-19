import { ElementPriceModel } from "../../db/models/elementPrice.model";
import { toNewElementPrice } from "../../factories/elementPrice.factory";
import { NewElementPrice, ElementPrice } from "./elementPrice.types";

export const saveElementPrice = async (
  elementPrice: NewElementPrice
): Promise<ElementPrice> => {
  const newElementPrice = await ElementPriceModel.create(elementPrice);
  return toNewElementPrice(newElementPrice);
};

export const updateElementPrice = async (
  elementPrice: Partial<ElementPrice>
): Promise<ElementPrice | null> => {
  const updatedElementPrice = await ElementPriceModel.update(elementPrice, {
    where: {
      id: elementPrice.id,
    },
  });
  return toNewElementPrice(updatedElementPrice);
};
