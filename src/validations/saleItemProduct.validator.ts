export const newSaleItemProductIsValid = async (saleItemProduct: any): Promise<boolean> => {
  return saleItemProduct.quantity > 0 && saleItemProduct.productId > 0 && saleItemProduct.saleItemId > 0
}
