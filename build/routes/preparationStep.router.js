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
const preparationStepService = __importStar(require("../services/preparationStep/preparationStep.service"));
const preparationStepFactory = __importStar(require("../factories/preparationStep.factory"));
const responseFactory = __importStar(require("../factories/response.factory"));
const errorHandler_1 = require("../utils/errorHandler");
const sequelize_1 = __importDefault(require("../libs/sequelize"));
const preparationStepInput_service_1 = require("../services/preparationStepInput/preparationStepInput.service");
const router = express_1.default.Router();
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const preparationStep = yield preparationStepService.getPreparationStepById(id);
        if (preparationStep !== undefined) {
            response.setResponse(preparationStep, ['PreparationStep retrieved successfully'], false);
        }
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    const transaction = yield sequelize_1.default.transaction();
    try {
        const _a = yield preparationStepFactory.toNewPreparationStep(req.body), { id } = _a, createPreparationStep = __rest(_a, ["id"]);
        const savedPreparationStep = yield preparationStepService.savePreparationStep(createPreparationStep);
        yield (0, preparationStepInput_service_1.savePreparationStepInputs)(createPreparationStep.preparationStepInputs, savedPreparationStep.id);
        yield transaction.commit();
        response.setResponse(savedPreparationStep, ['PreparationStep saved successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        yield transaction.rollback();
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.get('/stepUp/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const preparationStep = yield preparationStepService.getPreparationStepById(id);
        if (preparationStep === undefined)
            throw new Error('PreparationStep not found');
        yield preparationStepService.stepUp(preparationStep);
        response.setResponse(preparationStep, ['PreparationStep moved up successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.get('/stepDown/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const preparationStep = yield preparationStepService.getPreparationStepById(id);
        if (preparationStep === undefined)
            throw new Error('PreparationStep not found');
        yield preparationStepService.stepDown(preparationStep);
        response.setResponse(preparationStep, ['PreparationStep moved down successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    const transaction = yield sequelize_1.default.transaction();
    try {
        const id = parseInt(req.params.id);
        const preparationStep = yield preparationStepFactory.toNewPreparationStep(req.body);
        const savedPreparationStep = yield preparationStepService.updatePreparationStep(preparationStep, id);
        response.setResponse(savedPreparationStep, ['PreparationStep updated successfully'], false);
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const deletedPreparationStep = yield preparationStepService.deletePreparationStep(id);
        response.setResponse(deletedPreparationStep, ['PreparationStep deleted successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
exports.default = router;
