import { MenuModel } from "../../db/models/menu.model";
import { toNewMenu, toNewMenus } from "../../factories/menu.factory";
import { Menu, NewMenu } from "./menu.types";

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await MenuModel.findAll({
    where: {
      delete: false,
    },
  });
  return await toNewMenus(menus);
};

export const getMenuById = async (id: number): Promise<Menu | null> => {
  const menu = await MenuModel.findOne({
    where: {
      id,
      delete: false,
    },
  });
  return toNewMenu(menu);
};

export const saveMenu = async (menu: NewMenu): Promise<Menu> => {
  const newMenu = await MenuModel.create(menu);
  return toNewMenu(newMenu);
};

export const updateMenu = async (menu: Partial<Menu>): Promise<Menu | null> => {
  const updatedMenu = await MenuModel.update(menu, {
    where: {
      id: menu.id,
    },
  });
  return toNewMenu(updatedMenu);
};

export const deleteMenu = async (id: number): Promise<Menu | null> => {
  const deletedMenu = await MenuModel.update(
    { delete: true },
    {
      where: {
        id,
      },
    }
  );
  return toNewMenu(deletedMenu);
};
