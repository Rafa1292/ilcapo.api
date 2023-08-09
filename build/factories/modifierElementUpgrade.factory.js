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
exports.toNewModifierElementUpgrade = void 0;
const toNewModifierElementUpgrade = (modifierElement) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        id: modifierElement.id,
        modifierElementId: modifierElement.modifierGroupId,
        newModifierGroupId: modifierElement.newModifierGroupId,
        label: modifierElement.label,
        prices: modifierElement.prices,
        createdBy: modifierElement.createdBy,
        updatedBy: modifierElement.updatedBy,
        createdAt: modifierElement.createdAt,
        updatedAt: modifierElement.updatedAt
    };
});
exports.toNewModifierElementUpgrade = toNewModifierElementUpgrade;
