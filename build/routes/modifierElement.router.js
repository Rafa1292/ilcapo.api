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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const modifierElementService = __importStar(require("../services/modifierElement/modifierElement.service"));
const productReferenceService = __importStar(require("../services/productReference/productReference.service"));
const modifierElementFactory = __importStar(require("../factories/modifierElement.factory"));
const responseFactory = __importStar(require("../factories/response.factory"));
const errorHandler_1 = require("../utils/errorHandler");
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        response.setResponse(yield modifierElementService.getModifierElements(), ['ModifierElements retrieved successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse([], errors, true);
    }
    res.send(response);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const modifierElement = yield modifierElementService.getModifierElementById(id);
        if (modifierElement !== undefined) {
            response.setResponse(modifierElement, ['ModifierElement retrieved successfully'], false);
        }
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.post('/:modifierGroupId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const _a = yield modifierElementFactory.toNewModifierElement(req.body), { id } = _a, createModifierElement = __rest(_a, ["id"]);
        if (id > 0) {
            response.setResponse(undefined, ['ModifierElement already exists and was recovery'], false);
        }
        else {
            const savedModifierElement = yield modifierElementService.saveModifierElement(createModifierElement);
            if (createModifierElement.productReference !== undefined && createModifierElement.productReference.id === 0) {
                const productReference = Object.assign(Object.assign({}, createModifierElement.productReference), { modifierElementId: savedModifierElement.id });
                const { id } = productReference, newProductReference = __rest(productReference, ["id"]);
                yield productReferenceService.saveProductReference(newProductReference);
            }
            response.setResponse(savedModifierElement, ['ModifierElement saved successfully'], false);
        }
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.patch('/:id/:modifierGroupId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const response = responseFactory.toNewCustomResponse();
    try {
        const elementId = parseInt(req.params.id);
        const modifierElement = yield modifierElementFactory.toNewModifierElement(req.body);
        const savedModifierElement = yield modifierElementService.updateModifierElement(modifierElement, elementId);
        if (modifierElement.productReference !== undefined) {
            console.log('---------------inProductReference----------------------------');
            if (((_b = modifierElement.productReference) === null || _b === void 0 ? void 0 : _b.id) === 0) {
                const _d = modifierElement.productReference, { id } = _d, createProductReference = __rest(_d, ["id"]);
                const productReference = Object.assign(Object.assign({}, createProductReference), { modifierElementId: elementId });
                console.log('---------------saveProductReference----------------------------');
                yield productReferenceService.saveProductReference(productReference);
            }
            else {
                console.log('---------------updateProductReference----------------------------');
                yield productReferenceService.updateProductReference(modifierElement.productReference, (_c = modifierElement.productReference) === null || _c === void 0 ? void 0 : _c.id);
            }
        }
        else {
            console.log('---------------deleteProductReference----------------------------');
            // delete prduct reference by modifierElementId
            yield productReferenceService.deleteProductReference(elementId);
        }
        response.setResponse(savedModifierElement, ['ModifierElement updated successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const deletedModifierElement = yield modifierElementService.deleteModifierElement(id);
        response.setResponse(deletedModifierElement, ['ModifierElement deleted successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
exports.default = router;
