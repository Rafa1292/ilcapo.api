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
const menuService = __importStar(require("../services/menu/menu.service"));
const menuFactory = __importStar(require("../factories/menu.factory"));
const responseFactory = __importStar(require("../factories/response.factory"));
const errorHandler_1 = require("../utils/errorHandler");
const router = express_1.default.Router();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        response.setResponse(yield menuService.getMenus(), ["Menus retrieved successfully"], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse([], errors, true);
    }
    res.send(response);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        response.setResponse(yield menuService.getMenuById(id), ["Menu retrieved successfully"], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse([], errors, true);
    }
    res.send(response);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const _a = yield menuFactory.toNewMenu(req.body), { id } = _a, createMenu = __rest(_a, ["id"]);
        const savedMenu = yield menuService.saveMenu(createMenu);
        response.setResponse(savedMenu, ["Menu saved successfully"], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse([], errors, true);
    }
    res.send(response);
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const updateMenu = yield menuFactory.toNewMenu(req.body);
        const updatedMenu = yield menuService.updateMenu(updateMenu);
        response.setResponse(updatedMenu, ["Menu updated successfully"], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse([], errors, true);
    }
    res.send(response);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const deletedMenu = yield menuService.deleteMenu(id);
        response.setResponse(deletedMenu, ["Menu deleted successfully"], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse([], errors, true);
    }
    res.send(response);
}));
exports.default = router;