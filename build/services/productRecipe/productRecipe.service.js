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
exports.findProductRecipe = exports.deleteProductRecipe = exports.updateProductRecipe = exports.saveProductRecipe = void 0;
const productRecipe_model_1 = require("../../db/models/productRecipe.model");
const timeManager_1 = require("../../utils/timeManager");
const saveProductRecipe = (productRecipe) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    productRecipe.createdAt = now;
    productRecipe.updatedAt = now;
    return yield productRecipe_model_1.ProductRecipeModel.create(productRecipe);
});
exports.saveProductRecipe = saveProductRecipe;
const updateProductRecipe = (productRecipe, id) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    productRecipe.updatedAt = now;
    yield productRecipe_model_1.ProductRecipeModel.update(productRecipe, { where: { id } });
});
exports.updateProductRecipe = updateProductRecipe;
const deleteProductRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRecipe_model_1.ProductRecipeModel.destroy({ where: { id } });
});
exports.deleteProductRecipe = deleteProductRecipe;
const findProductRecipe = (productId, modifierElementId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productRecipe_model_1.ProductRecipeModel.findOne({
        where: {
            productId,
            modifierElementId
        },
        include: ['recipe']
    });
});
exports.findProductRecipe = findProductRecipe;
