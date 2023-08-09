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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUpgradeElementPrice = exports.updateUpgradeElementPrice = exports.saveUpgradeElementPrice = void 0;
const upgradeElementPrice_model_1 = require("../../db/models/upgradeElementPrice.model");
const upgradeElementPrice_factory_1 = require("../../factories/upgradeElementPrice.factory");
const saveUpgradeElementPrice = (upgradeElementPrice, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = upgradeElementPrice, rest = __rest(upgradeElementPrice, ["id"]);
    const newItemPrice = yield upgradeElementPrice_model_1.UpgradeElementPriceModel.create(rest, { transaction });
    return (0, upgradeElementPrice_factory_1.toNewUpgradeElementPrice)(newItemPrice);
});
exports.saveUpgradeElementPrice = saveUpgradeElementPrice;
const updateUpgradeElementPrice = (upgradeElementPrice, id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedItemPrice = yield upgradeElementPrice_model_1.UpgradeElementPriceModel.update(upgradeElementPrice, {
        where: {
            id: id,
        },
        transaction
    });
    return (0, upgradeElementPrice_factory_1.toNewUpgradeElementPrice)(updatedItemPrice);
});
exports.updateUpgradeElementPrice = updateUpgradeElementPrice;
const deleteUpgradeElementPrice = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield upgradeElementPrice_model_1.UpgradeElementPriceModel.destroy({ where: { id }, transaction });
});
exports.deleteUpgradeElementPrice = deleteUpgradeElementPrice;
