import { z } from "zod";
import { UpgradeElementPrice } from "../services/upgradeElementPrice/upgradeElementPrice.types";

export const upgradeElementPriceSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  upgradeId: z.number({
    required_error: 'El upgrade es requerido',
    invalid_type_error: 'El upgrade debe ser un numero entero',
  }),
  menuId: z.number({
    required_error: 'El menu es requerido',
    invalid_type_error: 'El menu debe ser un numero entero',
  }),
  price: z.number({
    required_error: 'El precio es requerido',
    invalid_type_error: 'El precio debe ser un numero entero',
  })
})

export const validateUpgradeElementPrice = async (upgradeElementPrice: any): Promise<UpgradeElementPrice> => {
  const result = await upgradeElementPriceSchema.safeParseAsync(upgradeElementPrice)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
};

export const validatePartialUpgradeElementPrice = async (upgradeElementPrice: any): Promise<Partial<UpgradeElementPrice>> => {
  const result = await upgradeElementPriceSchema.partial().safeParseAsync(upgradeElementPrice)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateUpgradeElementPrices = async (upgrades: any[]): Promise<UpgradeElementPrice[]> => {
  return await Promise.all(
    upgrades.map(async (upgrade) => {
      return await validateUpgradeElementPrice(upgrade);
    })
  );
};
