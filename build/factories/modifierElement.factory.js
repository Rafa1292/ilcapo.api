"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.toNewModifierElements = exports.toNewModifierElement = void 0;
const modifierElementValidator = __importStar(require("../validations/modifierElement.validator"));
const modifierElementUpgrade_factory_1 = require("./modifierElementUpgrade.factory");
const toNewModifierElement = (modifierElement) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield modifierElementValidator.newModifierElementIsValid(modifierElement);
    const newModifierElement = {
        id: id > 0 ? id : modifierElement.id,
        name: modifierElement.name,
        modifierGroupId: modifierElement.modifierGroupId,
        prices: modifierElement.prices,
        quantity: modifierElement.quantity,
        defaultRecipeId: modifierElement.defaultRecipeId,
        combinable: modifierElement.combinable,
        numberOfParts: modifierElement.numberOfParts,
        modifierUpgrade: modifierElement.modifierUpgrade === null || modifierElement.modifierUpgrade === undefined ? modifierElement.modifierUpgrade : yield (0, modifierElementUpgrade_factory_1.toNewModifierElementUpgrade)(modifierElement.modifierUpgrade),
        combinableModifierGroupId: modifierElement.combinableModifierGroupId,
        productReference: modifierElement.productReference,
        createdBy: modifierElement.createdBy,
        updatedBy: modifierElement.updatedBy,
        createdAt: modifierElement.createdAt,
        updatedAt: modifierElement.updatedAt,
        delete: modifierElement.delete
    };
    return newModifierElement;
});
exports.toNewModifierElement = toNewModifierElement;
const toNewModifierElements = (modifierElements) => __awaiter(void 0, void 0, void 0, function* () {
    const modifierElementsArray = [];
    for (const modifierElement of modifierElements) {
        modifierElementsArray.push(yield (0, exports.toNewModifierElement)(modifierElement));
    }
    return modifierElementsArray;
});
exports.toNewModifierElements = toNewModifierElements;
