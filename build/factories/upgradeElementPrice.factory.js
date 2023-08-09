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
exports.toNewUpgradeElementPrices = exports.toNewUpgradeElementPrice = void 0;
const toNewUpgradeElementPrice = (upgradeElementPrice) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        id: upgradeElementPrice.id,
        upgradeId: upgradeElementPrice.upgradeId,
        menuId: upgradeElementPrice.menuId,
        price: upgradeElementPrice.price,
        createdBy: upgradeElementPrice.createdBy,
        updatedBy: upgradeElementPrice.updatedBy,
        createdAt: upgradeElementPrice.createdAt,
        updatedAt: upgradeElementPrice.updatedAt,
        delete: upgradeElementPrice.delete,
    };
});
exports.toNewUpgradeElementPrice = toNewUpgradeElementPrice;
const toNewUpgradeElementPrices = (upgrades) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(upgrades.map((upgrade) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, exports.toNewUpgradeElementPrice)(upgrade);
    })));
});
exports.toNewUpgradeElementPrices = toNewUpgradeElementPrices;
