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
exports.toNewElementPrices = exports.toNewElementPrice = void 0;
const toNewElementPrice = (elementPrice) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.toNewElementPrice = toNewElementPrice;
const toNewElementPrices = (elements) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(elements.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, exports.toNewElementPrice)(element);
    })));
});
exports.toNewElementPrices = toNewElementPrices;
