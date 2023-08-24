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
exports.toNewProductModifiers = exports.toNewProductModifier = void 0;
const modifierGroup_factory_1 = require("./modifierGroup.factory");
const toNewProductModifier = (productModifier) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        id: productModifier.id,
        productId: productModifier.productId,
        modifierGroupId: productModifier.modifierGroupId,
        order: productModifier.order,
        modifierGroup: (productModifier.modifierGroup === undefined) || (productModifier.modifierGroup === null) ? productModifier.modifierGroup : yield (0, modifierGroup_factory_1.toNewModifierGroup)(productModifier.modifierGroup),
        createdBy: productModifier.createdBy,
        updatedBy: productModifier.updatedBy,
        createdAt: productModifier.createdAt,
        updatedAt: productModifier.updatedAt,
        delete: productModifier.delete
    };
});
exports.toNewProductModifier = toNewProductModifier;
const toNewProductModifiers = (productModifiers) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(productModifiers.map((productModifier) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, exports.toNewProductModifier)(productModifier); })));
});
exports.toNewProductModifiers = toNewProductModifiers;
