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
exports.deleteSaleItemProduct = exports.updateSaleItemProduct = exports.saveSaleItemProduct = void 0;
const saleItemProduct_model_1 = require("../../db/models/saleItemProduct.model");
const timeManager_1 = require("../../utils/timeManager");
const saveSaleItemProduct = (saleItemProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    saleItemProduct.createdAt = now;
    saleItemProduct.updatedAt = now;
    return yield saleItemProduct_model_1.SaleItemProductModel.create(saleItemProduct);
});
exports.saveSaleItemProduct = saveSaleItemProduct;
const updateSaleItemProduct = (saleItemProduct, id) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    saleItemProduct.updatedAt = now;
    yield saleItemProduct_model_1.SaleItemProductModel.update(saleItemProduct, { where: { id } });
});
exports.updateSaleItemProduct = updateSaleItemProduct;
const deleteSaleItemProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield saleItemProduct_model_1.SaleItemProductModel.destroy({ where: { id } });
});
exports.deleteSaleItemProduct = deleteSaleItemProduct;
