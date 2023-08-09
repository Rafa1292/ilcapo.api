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
exports.getProductModifiersByProductId = exports.saveProductModifiers = exports.deleteProductModifier = exports.updateProductModifier = exports.saveProductModifier = void 0;
const productModifier_model_1 = require("../../db/models/productModifier.model");
const saveProductModifier = (productModifier) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModifier_model_1.ProductModifierModel.create(productModifier);
});
exports.saveProductModifier = saveProductModifier;
const updateProductModifier = (productModifier, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield productModifier_model_1.ProductModifierModel.update(productModifier, { where: { id } });
});
exports.updateProductModifier = updateProductModifier;
const deleteProductModifier = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield productModifier_model_1.ProductModifierModel.destroy({ where: { id } });
});
exports.deleteProductModifier = deleteProductModifier;
const saveProductModifiers = (productModifiers, modifierGroupId) => __awaiter(void 0, void 0, void 0, function* () {
    for (const productModifier of productModifiers) {
        const { id } = productModifier, rest = __rest(productModifier, ["id"]);
        yield (0, exports.saveProductModifier)(Object.assign(Object.assign({}, rest), { modifierGroupId: modifierGroupId }));
    }
});
exports.saveProductModifiers = saveProductModifiers;
const getProductModifiersByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModifier_model_1.ProductModifierModel.findAll({
        where: {
            productId
        },
        include: [
            {
                association: 'modifierGroup',
                include: [
                    {
                        association: 'elements',
                        include: [
                            {
                                association: 'modifierUpgrade',
                                include: ['prices']
                            },
                            {
                                association: 'productReference'
                            },
                            {
                                association: 'prices',
                            }
                        ]
                    }
                ]
            }
        ]
    });
});
exports.getProductModifiersByProductId = getProductModifiersByProductId;
