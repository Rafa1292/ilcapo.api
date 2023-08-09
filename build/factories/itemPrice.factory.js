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
exports.toNewItemPrices = exports.toNewItemPrice = void 0;
const toNewItemPrice = (itemPrice) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        id: itemPrice.id,
        itemId: itemPrice.itemId,
        menuId: itemPrice.menuId,
        price: itemPrice.price,
        createdBy: itemPrice.createdBy,
        updatedBy: itemPrice.updatedBy,
        createdAt: itemPrice.createdAt,
        updatedAt: itemPrice.updatedAt,
        delete: itemPrice.delete,
    };
});
exports.toNewItemPrice = toNewItemPrice;
const toNewItemPrices = (items) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, exports.toNewItemPrice)(item);
    })));
});
exports.toNewItemPrices = toNewItemPrices;
