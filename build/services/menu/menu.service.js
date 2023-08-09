"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenu = exports.updateMenu = exports.saveMenu = exports.getMenuById = exports.getMenus = void 0;
const menu_model_1 = require("../../db/models/menu.model");
const menu_factory_1 = require("../../factories/menu.factory");
const getMenus = () => __awaiter(void 0, void 0, void 0, function* () {
    const menus = yield menu_model_1.MenuModel.findAll({
        where: {
            delete: false,
        },
    });
    return yield (0, menu_factory_1.toNewMenus)(menus);
});
exports.getMenus = getMenus;
const getMenuById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = yield menu_model_1.MenuModel.findOne({
        where: {
            id,
            delete: false,
        },
    });
    return (0, menu_factory_1.toNewMenu)(menu);
});
exports.getMenuById = getMenuById;
const saveMenu = (menu) => __awaiter(void 0, void 0, void 0, function* () {
    const newMenu = yield menu_model_1.MenuModel.create(menu);
    return (0, menu_factory_1.toNewMenu)(newMenu);
});
exports.saveMenu = saveMenu;
const updateMenu = (menu) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedMenu = yield menu_model_1.MenuModel.update(menu, {
        where: {
            id: menu.id,
        },
    });
    return (0, menu_factory_1.toNewMenu)(updatedMenu);
});
exports.updateMenu = updateMenu;
const deleteMenu = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMenu = yield menu_model_1.MenuModel.update({ delete: true }, {
        where: {
            id,
        },
    });
    return (0, menu_factory_1.toNewMenu)(deletedMenu);
});
exports.deleteMenu = deleteMenu;
