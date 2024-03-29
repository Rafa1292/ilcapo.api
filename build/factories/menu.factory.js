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
exports.toNewMenus = exports.toNewMenu = void 0;
const toNewMenu = (menu) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        id: menu.id,
        name: menu.name,
        comissionPercentage: menu.comissionPercentage,
        createdBy: menu.createdBy,
        updatedBy: menu.updatedBy,
        createdAt: menu.createdAt,
        updatedAt: menu.updatedAt,
        delete: menu.delete
    };
});
exports.toNewMenu = toNewMenu;
const toNewMenus = (menus) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(menus.map((menu) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, exports.toNewMenu)(menu);
    })));
});
exports.toNewMenus = toNewMenus;
