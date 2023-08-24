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
exports.downProductModifierOrder = exports.upProductModifierOrder = exports.getProductModifiersByProductId = exports.saveProductModifiers = exports.deleteProductModifier = exports.updateProductModifier = exports.saveProductModifier = void 0;
const productModifier_model_1 = require("../../db/models/productModifier.model");
const timeManager_1 = require("../../utils/timeManager");
const saveProductModifier = (productModifier) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    productModifier.createdAt = now;
    productModifier.updatedAt = now;
    return yield productModifier_model_1.ProductModifierModel.create(productModifier);
});
exports.saveProductModifier = saveProductModifier;
const updateProductModifier = (productModifier, id) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    productModifier.updatedAt = now;
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
            productId,
            delete: false,
        },
        include: [
            {
                association: 'modifierGroup',
                where: { delete: false },
                include: [
                    {
                        association: 'elements',
                        where: {
                            delete: false,
                        },
                        include: [
                            {
                                association: 'modifierUpgrade',
                                include: ['prices'],
                            },
                            {
                                association: 'productReference',
                            },
                            {
                                association: 'prices',
                            },
                        ],
                    },
                ],
            },
        ],
    });
});
exports.getProductModifiersByProductId = getProductModifiersByProductId;
const upProductModifierOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productModifier = yield productModifier_model_1.ProductModifierModel.findByPk(id);
    if (!productModifier)
        throw new Error('Product Modifier not found');
    const productModifiers = yield productModifier_model_1.ProductModifierModel.findAll({
        where: {
            productId: productModifier.productId,
        },
        order: [['order', 'ASC']],
    });
    const modifiersCount = productModifiers.length;
    const order = productModifier.order === null ? 0 : productModifier.order;
    if (order < modifiersCount) {
        yield productModifier.update({ order: (order + 1) }, { where: { id: productModifier.id } });
        for (const modifier of productModifiers) {
            if (modifier.order === null) {
                yield modifier.update({ order: modifiersCount }, { where: { id: modifier.id } });
            }
            if (modifier.order === (order + 1)) {
                yield modifier.update({ order: order }, { where: { id: modifier.id } });
                break;
            }
        }
    }
});
exports.upProductModifierOrder = upProductModifierOrder;
const downProductModifierOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productModifier = yield productModifier_model_1.ProductModifierModel.findByPk(id);
    if (!productModifier)
        throw new Error('Product Modifier not found');
    const productModifiers = yield productModifier_model_1.ProductModifierModel.findAll({
        where: {
            productId: productModifier.productId,
        },
        order: [['order', 'ASC']],
    });
    const order = productModifier.order === null ? 0 : productModifier.order;
    if (order > 1) {
        yield productModifier.update({ order: order - 1 }, { where: { id: productModifier.id } });
        for (const modifier of productModifiers) {
            if (modifier.order === null) {
                yield modifier.update({ order: productModifiers.length }, { where: { id: modifier.id } });
            }
            if (modifier.order === (order - 1)) {
                yield modifier.update({ order: order }, { where: { id: modifier.id } });
                break;
            }
        }
    }
});
exports.downProductModifierOrder = downProductModifierOrder;
