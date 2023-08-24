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
exports.recoverySaleItemCategory = exports.deleteSaleItemCategory = exports.updateSaleItemCategory = exports.saveSaleItemCategory = exports.getSaleItemCategoryById = exports.getSaleItemCategoriesWithDeletedItems = exports.getSaleItemCategoriesWithActiveProducts = exports.getSaleItemCategories = void 0;
const saleItemCategory_model_1 = require("../../db/models/saleItemCategory.model");
const saleItemCategory_factory_1 = require("../../factories/saleItemCategory.factory");
const timeManager_1 = require("../../utils/timeManager");
const getSaleItemCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield saleItemCategory_model_1.SaleItemCategoryModel.findAll({
        where: {
            delete: false,
        },
        include: [
            {
                association: 'saleItems',
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
            },
        ],
    });
});
exports.getSaleItemCategories = getSaleItemCategories;
const getSaleItemCategoriesWithActiveProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield saleItemCategory_model_1.SaleItemCategoryModel.findAll({
        where: {
            delete: false,
        },
        include: [
            {
                association: 'saleItems',
                include: [
                    {
                        association: 'saleItemProducts',
                        include: [
                            {
                                association: 'product',
                                where: {
                                    active: true,
                                }
                            },
                        ],
                    },
                    'prices',
                ],
            },
        ],
    });
    const newCategories = [];
    categories.map((category) => {
        const newCategory = category.toJSON();
        newCategory.saleItems = newCategory.saleItems.filter((saleItem) => {
            saleItem.saleItemProducts = saleItem.saleItemProducts.filter((saleItemProduct) => {
                return saleItemProduct.product !== null;
            });
            return saleItem.saleItemProducts.length > 0;
        });
        if (newCategory.saleItems.length > 0) {
            newCategories.push(newCategory);
        }
    });
    return newCategories;
});
exports.getSaleItemCategoriesWithActiveProducts = getSaleItemCategoriesWithActiveProducts;
const getSaleItemCategoriesWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield saleItemCategory_model_1.SaleItemCategoryModel.findAll();
});
exports.getSaleItemCategoriesWithDeletedItems = getSaleItemCategoriesWithDeletedItems;
const getSaleItemCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield saleItemCategory_model_1.SaleItemCategoryModel.findByPk(id);
    if (response === null)
        throw new Error('SaleItemCategory not found');
    if (response.delete)
        throw new Error('SaleItemCategory deleted');
    return yield (0, saleItemCategory_factory_1.toNewSaleItemCategory)(response);
});
exports.getSaleItemCategoryById = getSaleItemCategoryById;
const saveSaleItemCategory = (saleItemCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    saleItemCategory.createdAt = now;
    saleItemCategory.updatedAt = now;
    return yield saleItemCategory_model_1.SaleItemCategoryModel.create(saleItemCategory);
});
exports.saveSaleItemCategory = saveSaleItemCategory;
const updateSaleItemCategory = (saleItemCategory, id) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    saleItemCategory.updatedAt = now;
    yield saleItemCategory_model_1.SaleItemCategoryModel.update(saleItemCategory, { where: { id } });
});
exports.updateSaleItemCategory = updateSaleItemCategory;
const deleteSaleItemCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const saleItemCategory = yield (0, exports.getSaleItemCategoryById)(id);
    saleItemCategory.delete = true;
    yield (0, exports.updateSaleItemCategory)(saleItemCategory, id);
});
exports.deleteSaleItemCategory = deleteSaleItemCategory;
const recoverySaleItemCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const saleItemCategory = yield (0, exports.getSaleItemCategoryById)(id);
    saleItemCategory.delete = false;
    yield (0, exports.updateSaleItemCategory)(saleItemCategory, id);
});
exports.recoverySaleItemCategory = recoverySaleItemCategory;
