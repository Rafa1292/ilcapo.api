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
exports.newModifierElementUpgradeIsValid = void 0;
const newModifierElementUpgradeIsValid = (modifierElementUpgrade) => __awaiter(void 0, void 0, void 0, function* () {
    let isValid = true;
    if (modifierElementUpgrade.newModifierGroupId === undefined) {
        isValid = false;
    }
    if (typeof modifierElementUpgrade.label !== 'string') {
        isValid = false;
    }
    if (modifierElementUpgrade.price === undefined || modifierElementUpgrade.price <= 0) {
        isValid = false;
    }
    if (modifierElementUpgrade.modifierElementId === undefined) {
        isValid = false;
    }
    return isValid;
});
exports.newModifierElementUpgradeIsValid = newModifierElementUpgradeIsValid;
