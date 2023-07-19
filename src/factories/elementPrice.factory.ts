import { ElementPrice } from "../services/elementPrice/elementPrice.types";

export const toNewElementPrice = async (elementPrice: any): Promise<ElementPrice> => {
  return {
    id: elementPrice.id,
    elementId: elementPrice.elementId,
    menuId: elementPrice.menuId,
    price: elementPrice.price,
    createdBy: elementPrice.createdBy,
    updatedBy: elementPrice.updatedBy,
    createdAt: elementPrice.createdAt,
    updatedAt: elementPrice.updatedAt,
    delete: elementPrice.delete,
  };
};

export const toNewElementPrices = async (elements: any[]): Promise<ElementPrice[]> => {
  return await Promise.all(
    elements.map(async (element) => {
      return await toNewElementPrice(element);
    })
  );
};
