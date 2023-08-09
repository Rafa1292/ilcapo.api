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
exports.recoverySaleItem = exports.deleteSaleItem = exports.updateSaleItem = exports.saveSaleItem = exports.getSaleItemById = exports.getSaleItemsWithDeletedItems = exports.getSaleItems = void 0;
const saleItem_model_1 = require("../../db/models/saleItem.model");
const saleItem_factory_1 = require("../../factories/saleItem.factory");
const itemPrice_service_1 = require("../itemPrice/itemPrice.service");
const getSaleItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield saleItem_model_1.SaleItemModel.findAll({
        where: {
            delete: false,
        },
        include: [
            {
                association: 'saleItemProducts',
                include: [
                    {
                        association: 'product',
                    },
                ],
            },
            'prices',
        ],
    });
});
exports.getSaleItems = getSaleItems;
const getSaleItemsWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield saleItem_model_1.SaleItemModel.findAll();
});
exports.getSaleItemsWithDeletedItems = getSaleItemsWithDeletedItems;
const getSaleItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield saleItem_model_1.SaleItemModel.findByPk(id, { include: ['prices'] });
    if (response === null)
        throw new Error('SaleItem not found');
    if (response.delete)
        throw new Error('SaleItem deleted');
    return yield (0, saleItem_factory_1.toNewSaleItem)(response);
});
exports.getSaleItemById = getSaleItemById;
const saveSaleItem = (saleItem) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transaction = yield ((_a = saleItem_model_1.SaleItemModel.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
    if (!transaction)
        throw new Error('Transaction not found');
    try {
        const newSaleItem = yield saleItem_model_1.SaleItemModel.create(saleItem, { transaction });
        yield savePrices({ id: newSaleItem.id, prices: saleItem.prices }, transaction);
        yield (transaction === null || transaction === void 0 ? void 0 : transaction.commit());
    }
    catch (error) {
        yield (transaction === null || transaction === void 0 ? void 0 : transaction.rollback());
        throw error;
    }
});
exports.saveSaleItem = saveSaleItem;
const updateSaleItem = (saleItem, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const transaction = yield ((_b = saleItem_model_1.SaleItemModel.sequelize) === null || _b === void 0 ? void 0 : _b.transaction());
    if (!transaction)
        throw new Error('Transaction not found');
    try {
        yield saleItem_model_1.SaleItemModel.update(saleItem, { where: { id }, transaction });
        const _e = yield (0, exports.getSaleItemById)(id), { prices } = _e, currentSaleItem = __rest(_e, ["prices"]);
        const pricesToUpdate = ((_c = saleItem.prices) === null || _c === void 0 ? void 0 : _c.filter((price) => prices === null || prices === void 0 ? void 0 : prices.some((p) => p.id === price.id))) || [];
        const pricesToRemove = prices.filter((price) => { var _a; return !((_a = saleItem.prices) === null || _a === void 0 ? void 0 : _a.some((p) => p.id === price.id)); });
        const pricesToSave = ((_d = saleItem.prices) === null || _d === void 0 ? void 0 : _d.filter((price) => price.id === 0)) || [];
        if (pricesToUpdate.length > 0)
            yield updatePrices(Object.assign(Object.assign({}, currentSaleItem), { prices: pricesToUpdate }), transaction);
        if (pricesToRemove.length > 0)
            yield removePrices(Object.assign(Object.assign({}, currentSaleItem), { prices: pricesToRemove }), transaction);
        if ((pricesToSave === null || pricesToSave === void 0 ? void 0 : pricesToSave.length) > 0)
            yield savePrices(Object.assign(Object.assign({}, currentSaleItem), { prices: pricesToSave }), transaction);
        yield transaction.commit();
    }
    catch (error) {
        yield (transaction === null || transaction === void 0 ? void 0 : transaction.rollback());
        throw error;
    }
});
exports.updateSaleItem = updateSaleItem;
const savePrices = (saleItem, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('---------------------------------------')
    // console.log(saleItem)
    for (const price of saleItem.prices) {
        // console.log('---------------------------------------')
        // console.log(saleItem)
        yield (0, itemPrice_service_1.saveItemPrice)(Object.assign(Object.assign({}, price), { itemId: saleItem.id }), transaction);
    }
});
const updatePrices = (saleItem, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('-------update-------------');
    for (const price of saleItem.prices) {
        yield (0, itemPrice_service_1.updateItemPrice)(Object.assign(Object.assign({}, price), { itemId: saleItem.id }), price.id, transaction);
    }
});
const removePrices = (saleItem, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    for (const price of saleItem.prices) {
        yield (0, itemPrice_service_1.deleteItemPrice)(price.id, transaction);
    }
});
const deleteSaleItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const saleItem = yield (0, exports.getSaleItemById)(id);
    saleItem.delete = true;
    yield (0, exports.updateSaleItem)(saleItem, id);
});
exports.deleteSaleItem = deleteSaleItem;
const recoverySaleItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const saleItem = yield (0, exports.getSaleItemById)(id);
    saleItem.delete = false;
    yield (0, exports.updateSaleItem)(saleItem, id);
});
exports.recoverySaleItem = recoverySaleItem;
