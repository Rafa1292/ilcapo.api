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
exports.recoveryProduct = exports.deleteProduct = exports.updateProduct = exports.saveProduct = exports.getProductById = exports.getProductsWithDeletedItems = exports.getProducts = void 0;
const product_model_1 = require("../../db/models/product.model");
const product_factory_1 = require("../../factories/product.factory");
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.ProductModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'productModifiers',
                include: [
                    {
                        association: 'modifierGroup',
                        include: [
                            {
                                association: 'elements',
                                include: [
                                    'modifierUpgrade'
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    return yield (0, product_factory_1.toNewProducts)(products);
});
exports.getProducts = getProducts;
const getProductsWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.ProductModel.findAll();
});
exports.getProductsWithDeletedItems = getProductsWithDeletedItems;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.ProductModel.findByPk(id);
    if (response === null)
        throw new Error('Product not found');
    if (response.delete)
        throw new Error('Product deleted');
    return yield (0, product_factory_1.toNewProduct)(response);
});
exports.getProductById = getProductById;
const saveProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.ProductModel.create(product);
});
exports.saveProduct = saveProduct;
const updateProduct = (product, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_model_1.ProductModel.update(product, { where: { id } });
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, exports.getProductById)(id);
    product.delete = true;
    yield (0, exports.updateProduct)(product, id);
});
exports.deleteProduct = deleteProduct;
const recoveryProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, exports.getProductById)(id);
    product.delete = false;
    yield (0, exports.updateProduct)(product, id);
});
exports.recoveryProduct = recoveryProduct;
