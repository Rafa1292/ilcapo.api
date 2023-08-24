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
exports.recoveryModifierElement = exports.deleteModifierElement = exports.updateModifierElement = exports.saveModifierElement = exports.getModifierElementById = exports.getModifierElementsWithDeletedItems = exports.getModifierElements = void 0;
const modifierElement_model_1 = require("../../db/models/modifierElement.model");
const modifierElement_factory_1 = require("../../factories/modifierElement.factory");
const elementPrice_service_1 = require("../elementPrice/elementPrice.service");
const modifierElementUpgrade_service_1 = require("../modifierElementUpgrade/modifierElementUpgrade.service");
const timeManager_1 = require("../../utils/timeManager");
const getModifierElements = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield modifierElement_model_1.ModifierElementModel.findAll({
        where: {
            delete: false,
        },
        include: [
            {
                association: 'modifierElementUpgrade',
            },
        ],
    });
});
exports.getModifierElements = getModifierElements;
const getModifierElementsWithDeletedItems = (modifierGroupId) => __awaiter(void 0, void 0, void 0, function* () {
    const modifierelements = yield modifierElement_model_1.ModifierElementModel.findAll();
    return modifierelements.filter((modifierElement) => modifierElement.modifierGroupId === modifierGroupId);
});
exports.getModifierElementsWithDeletedItems = getModifierElementsWithDeletedItems;
const getModifierElementById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield modifierElement_model_1.ModifierElementModel.findByPk(id, {
        include: ['modifierUpgrade', 'productReference', 'prices'],
    });
    if (response === null)
        throw new Error('ModifierElement not found');
    return yield (0, modifierElement_factory_1.toNewModifierElement)(response);
});
exports.getModifierElementById = getModifierElementById;
const saveModifierElement = (modifierElement) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transaction = yield ((_a = modifierElement_model_1.ModifierElementModel.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
    if (!transaction)
        throw new Error('Transaction not found');
    try {
        const now = (0, timeManager_1.getNow)();
        modifierElement.createdAt = now;
        modifierElement.updatedAt = now;
        const newModifierElement = yield modifierElement_model_1.ModifierElementModel.create(modifierElement, { transaction });
        yield (0, modifierElementUpgrade_service_1.saveModifierElementUpgrade)(Object.assign(Object.assign({}, modifierElement.modifierUpgrade), { modifierElementId: newModifierElement.id }), transaction);
        yield savePrices({
            id: newModifierElement.id,
            prices: modifierElement.prices,
        }, transaction);
        yield transaction.commit();
        return yield (0, exports.getModifierElementById)(newModifierElement.id);
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.saveModifierElement = saveModifierElement;
const updateModifierElement = (modifierElement, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const transaction = yield ((_b = modifierElement_model_1.ModifierElementModel.sequelize) === null || _b === void 0 ? void 0 : _b.transaction());
    if (!transaction)
        throw new Error('Transaction not found');
    try {
        const now = (0, timeManager_1.getNow)();
        modifierElement.updatedAt = now;
        yield modifierElement_model_1.ModifierElementModel.update(modifierElement, { where: { id } });
        const _e = yield (0, exports.getModifierElementById)(id), { prices } = _e, currentModifierElement = __rest(_e, ["prices"]);
        if (modifierElement.modifierUpgrade)
            yield saveUpgrade(modifierElement.modifierUpgrade, id, transaction);
        const pricesToUpdate = ((_c = modifierElement.prices) === null || _c === void 0 ? void 0 : _c.filter((price) => prices === null || prices === void 0 ? void 0 : prices.some((p) => p.id === price.id))) || [];
        const pricesToRemove = prices === null || prices === void 0 ? void 0 : prices.filter((price) => { var _a; return !((_a = modifierElement.prices) === null || _a === void 0 ? void 0 : _a.some((p) => p.id === price.id)); });
        const pricesToSave = ((_d = modifierElement.prices) === null || _d === void 0 ? void 0 : _d.filter((price) => price.id === 0)) || [];
        if ((pricesToRemove === null || pricesToRemove === void 0 ? void 0 : pricesToRemove.length) > 0)
            yield removePrices(Object.assign(Object.assign({}, currentModifierElement), { prices: pricesToRemove }), transaction);
        if ((pricesToUpdate === null || pricesToUpdate === void 0 ? void 0 : pricesToUpdate.length) > 0)
            yield updatePrices(Object.assign(Object.assign({}, currentModifierElement), { prices: pricesToUpdate }), transaction);
        if ((pricesToSave === null || pricesToSave === void 0 ? void 0 : pricesToSave.length) > 0)
            yield savePrices(Object.assign(Object.assign({}, currentModifierElement), { prices: pricesToSave }), transaction);
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.updateModifierElement = updateModifierElement;
const saveUpgrade = (modifierElementUpgrade, id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (modifierElementUpgrade.id === undefined) {
        yield (0, modifierElementUpgrade_service_1.deleteModifierElementUpgradeByModifierElementId)(id);
    }
    else {
        if (modifierElementUpgrade.id === 0) {
            yield (0, modifierElementUpgrade_service_1.saveModifierElementUpgrade)(Object.assign(Object.assign({}, modifierElementUpgrade), { modifierElementId: id }), transaction);
        }
        else {
            yield (0, modifierElementUpgrade_service_1.updateModifierElementUpgrade)(modifierElementUpgrade, modifierElementUpgrade.id);
        }
    }
});
const deleteModifierElement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.updateModifierElement)({ delete: true }, id);
});
exports.deleteModifierElement = deleteModifierElement;
const recoveryModifierElement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const modifierElement = yield (0, exports.getModifierElementById)(id);
    modifierElement.delete = false;
    yield (0, exports.updateModifierElement)(modifierElement, id);
});
exports.recoveryModifierElement = recoveryModifierElement;
const savePrices = (modifierElement, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    for (const price of modifierElement.prices) {
        yield (0, elementPrice_service_1.saveElementPrice)(Object.assign(Object.assign({}, price), { elementId: modifierElement.id }), transaction);
    }
});
const updatePrices = (modifierElement, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    for (const price of modifierElement.prices) {
        yield (0, elementPrice_service_1.updateElementPrice)(Object.assign(Object.assign({}, price), { elementId: modifierElement.id }), price.id, transaction);
    }
});
const removePrices = (modifierElement, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    for (const price of modifierElement.prices) {
        yield (0, elementPrice_service_1.deleteElementPrice)(price.id, transaction);
    }
});
