import { Menu } from "../services/menu/menu.types"

export const toNewMenu = async (menu: any): Promise<Menu> => {  
    return {
      id: menu.id,
      name: menu.name,
      comissionPercentage: menu.comissionPercentage,
      createdBy: menu.createdBy,
      updatedBy: menu.updatedBy,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
      delete: menu.delete
    }
  }

  export const toNewMenus = async (menus: any[]): Promise<Menu[]> => {
    return await Promise.all(menus.map(async (menu) => {
      return await toNewMenu(menu);
    }));
  }