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
exports.deleteItemPrice = exports.updateItemPrice = exports.saveItemPrice = void 0;
const itemPrice_model_1 = require("../../db/models/itemPrice.model");
const itemPrice_factory_1 = require("../../factories/itemPrice.factory");
const saveItemPrice = (itemPrice, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = itemPrice, newItemPrice = __rest(itemPrice, ["id"]);
    const currentItemPrice = yield itemPrice_model_1.ItemPriceModel.create(newItemPrice, { transaction });
    return (0, itemPrice_factory_1.toNewItemPrice)(currentItemPrice);
});
exports.saveItemPrice = saveItemPrice;
const updateItemPrice = (itemPrice, id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedItemPrice = yield itemPrice_model_1.ItemPriceModel.update(itemPrice, {
        where: {
            id: id,
        },
        transaction
    });
    return (0, itemPrice_factory_1.toNewItemPrice)(updatedItemPrice);
});
exports.updateItemPrice = updateItemPrice;
const deleteItemPrice = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield itemPrice_model_1.ItemPriceModel.destroy({ where: { id }, transaction });
});
exports.deleteItemPrice = deleteItemPrice;
