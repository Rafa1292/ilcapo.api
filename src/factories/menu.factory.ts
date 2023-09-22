import { z } from 'zod'
import { Menu } from '../services/menu/menu.types'

const menuSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre de la marca es requerido',
    invalid_type_error: 'El nombre de la marca debe ser  un texto',
  }),
  comissionPercentage: z.number({
    required_error: 'El porcentaje de comision es requerido',
    invalid_type_error: 'El porcentaje de comision debe ser un numero entero',
  }),
})

export const validateMenu = async (menu: any): Promise<Menu> => {
  const result = await menuSchema.safeParseAsync(menu)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialMenu = async (menu: any): Promise<Partial<Menu>> => {
  const result = await menuSchema.partial().safeParseAsync(menu)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateMenus = async (menus: any[]): Promise<Menu[]> => {
  return await Promise.all(
    menus.map(async (menu) => {
      return await validateMenu(menu)
    })
  )
}
