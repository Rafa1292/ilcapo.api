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
exports.newModifierElementIsValid = void 0;
const modifierElement_service_1 = require("../services/modifierElement/modifierElement.service");
const validator = __importStar(require("../utils/genericValidators/validator.util"));
const parseName = (name) => {
    if (!validator.isString(name)) {
        throw new Error('Incorrect or missing name:');
    }
    return name;
};
const validateUniqueName = (name, id, modifierGroupId) => __awaiter(void 0, void 0, void 0, function* () {
    const modifierElements = yield (0, modifierElement_service_1.getModifierElementsWithDeletedItems)(modifierGroupId);
    const modifierElement = modifierElements.find((x) => x.name.toLowerCase() === name.toLowerCase());
    if (modifierElement !== null && modifierElement !== undefined) {
        if ((modifierElement === null || modifierElement === void 0 ? void 0 : modifierElement.id) !== id) {
            if (modifierElement.delete) {
                yield (0, modifierElement_service_1.recoveryModifierElement)(modifierElement.id);
                return modifierElement.id;
            }
            throw new Error('Este nombre de elemento ya existe');
        }
    }
    return undefined;
});
const newModifierElementIsValid = (modifierElement) => __awaiter(void 0, void 0, void 0, function* () {
    parseName(modifierElement === null || modifierElement === void 0 ? void 0 : modifierElement.name);
    const id = yield validateUniqueName(modifierElement === null || modifierElement === void 0 ? void 0 : modifierElement.name, modifierElement === null || modifierElement === void 0 ? void 0 : modifierElement.id, modifierElement.modifierGroupId);
    if (id === undefined)
        return 0;
    return id;
});
exports.newModifierElementIsValid = newModifierElementIsValid;
