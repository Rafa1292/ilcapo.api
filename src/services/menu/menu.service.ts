import { MenuModel } from '../../db/models/menu.model'
import { Menu, MenuAttributes } from './menu.types'

export const getMenus = async (): Promise<Menu[]> => {
  return await MenuModel.findAll({
    where: {
      delete: false,
    },
  })
}

export const getMenuByName = async (name: string, id: number): Promise<Menu | undefined> => {
  const objs = await MenuModel.findAll({})
  const obj = objs.find((tmp: Menu) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })
  return obj
}


export const getMenuById = async (id: number): Promise<Menu | null> => {
  return await MenuModel.findOne({
    where: {
      id,
      delete: false,
    },
  })
}

export const saveMenu = async (menu: Menu): Promise<Menu> => {
  const { id, ...rest } = MenuModel.getMenu(menu, 0);
  return await MenuModel.create(rest)
}

export const updateMenu = async (menu: Partial<MenuAttributes>): Promise<Menu | null> => {
  const updateMenu = MenuModel.getPartialMenu(menu, 0)
  await MenuModel.update(updateMenu, {
    where: {
      id: menu.id,
    },
  })
  return MenuModel.findByPk(menu.id)
}

export const deleteMenu = async (id: number): Promise<Menu | null> => {
  return await updateMenu({ id, delete: true })
}

export const recoveryMenu = async (id: number): Promise<Menu | null> => {
  return await updateMenu({ id, delete: false })
}
