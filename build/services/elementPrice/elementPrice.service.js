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
exports.deleteElementPrice = exports.updateElementPrice = exports.saveElementPrice = void 0;
const elementPrice_model_1 = require("../../db/models/elementPrice.model");
const elementPrice_factory_1 = require("../../factories/elementPrice.factory");
const timeManager_1 = require("../../utils/timeManager");
const saveElementPrice = (elementPrice, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = elementPrice, rest = __rest(elementPrice, ["id"]);
    const now = (0, timeManager_1.getNow)();
    rest.createdAt = now;
    rest.updatedAt = now;
    const currentElementPrice = yield elementPrice_model_1.ElementPriceModel.create(rest, { transaction });
    return (0, elementPrice_factory_1.toNewElementPrice)(currentElementPrice);
});
exports.saveElementPrice = saveElementPrice;
const updateElementPrice = (elementPrice, id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    elementPrice.updatedAt = now;
    const updatedElementPrice = yield elementPrice_model_1.ElementPriceModel.update(elementPrice, {
        where: {
            id: id,
        },
        transaction
    });
    return (0, elementPrice_factory_1.toNewElementPrice)(updatedElementPrice);
});
exports.updateElementPrice = updateElementPrice;
const deleteElementPrice = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield elementPrice_model_1.ElementPriceModel.destroy({ where: { id }, transaction });
});
exports.deleteElementPrice = deleteElementPrice;
