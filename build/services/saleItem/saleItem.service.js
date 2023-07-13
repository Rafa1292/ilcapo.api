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
exports.recoverySaleItem = exports.deleteSaleItem = exports.updateSaleItem = exports.saveSaleItem = exports.getSaleItemById = exports.getSaleItemsWithDeletedItems = exports.getSaleItems = void 0;
const saleItem_model_1 = require("../../db/models/saleItem.model");
const saleItem_factory_1 = require("../../factories/saleItem.factory");
const getSaleItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield saleItem_model_1.SaleItemModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'saleItemProducts',
                include: [
                    {
                        association: 'product'
                    }
                ]
            }
        ]
    });
});
exports.getSaleItems = getSaleItems;
const getSaleItemsWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield saleItem_model_1.SaleItemModel.findAll();
});
exports.getSaleItemsWithDeletedItems = getSaleItemsWithDeletedItems;
const getSaleItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield saleItem_model_1.SaleItemModel.findByPk(id);
    if (response === null)
        throw new Error('SaleItem not found');
    if (response.delete)
        throw new Error('SaleItem deleted');
    return yield (0, saleItem_factory_1.toNewSaleItem)(response);
});
exports.getSaleItemById = getSaleItemById;
const saveSaleItem = (provider) => __awaiter(void 0, void 0, void 0, function* () {
    yield saleItem_model_1.SaleItemModel.create(provider);
});
exports.saveSaleItem = saveSaleItem;
const updateSaleItem = (saleItem, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield saleItem_model_1.SaleItemModel.update(saleItem, { where: { id } });
});
exports.updateSaleItem = updateSaleItem;
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
