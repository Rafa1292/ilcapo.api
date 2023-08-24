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
exports.deleteProductReference = exports.updateProductReference = exports.saveProductReference = exports.getProductReferenceByModifierElementId = void 0;
const productReference_model_1 = require("../../db/models/productReference.model");
const productReference_factory_1 = require("../../factories/productReference.factory");
const timeManager_1 = require("../../utils/timeManager");
const getProductReferenceByModifierElementId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield productReference_model_1.ProductReferenceModel.findOne({ where: { modifierElementId: id } });
    if (response === null)
        throw new Error('ProductReference not found');
    return yield (0, productReference_factory_1.toNewProductReference)(response);
});
exports.getProductReferenceByModifierElementId = getProductReferenceByModifierElementId;
const saveProductReference = (productReference) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    productReference.createdAt = now;
    productReference.updatedAt = now;
    return yield productReference_model_1.ProductReferenceModel.create(productReference);
});
exports.saveProductReference = saveProductReference;
const updateProductReference = (productReference, id) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    productReference.updatedAt = now;
    yield productReference_model_1.ProductReferenceModel.update(productReference, { where: { id } });
});
exports.updateProductReference = updateProductReference;
const deleteProductReference = (modifierElementId) => __awaiter(void 0, void 0, void 0, function* () {
    yield productReference_model_1.ProductReferenceModel.destroy({ where: { modifierElementId } });
});
exports.deleteProductReference = deleteProductReference;
