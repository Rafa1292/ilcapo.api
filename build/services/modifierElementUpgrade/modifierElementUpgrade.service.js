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
exports.getModifierElementUpgradeByModiifierElementId = exports.deleteModifierElementUpgradeByModifierElementId = exports.updateModifierElementUpgrade = exports.saveModifierElementUpgrade = void 0;
const modifierElementUpgrade_model_1 = require("../../db/models/modifierElementUpgrade.model");
const modifierElementUpgrade_validator_1 = require("../../validations/modifierElementUpgrade.validator");
const upgradeElementPrice_service_1 = require("../upgradeElementPrice/upgradeElementPrice.service");
const saveModifierElementUpgrade = (modifierElementUpgrade, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = yield (0, modifierElementUpgrade_validator_1.newModifierElementUpgradeIsValid)(modifierElementUpgrade);
    if (isValid) {
        console.log(1, '-------is valid-----');
        const { id } = modifierElementUpgrade, rest = __rest(modifierElementUpgrade, ["id"]);
        const newModifierElementUpgrade = yield modifierElementUpgrade_model_1.ModifierElementUpgradeModel.create(rest, { transaction });
        yield savePrices({
            id: newModifierElementUpgrade.id,
            prices: modifierElementUpgrade.prices,
        }, transaction, newModifierElementUpgrade.id);
    }
});
exports.saveModifierElementUpgrade = saveModifierElementUpgrade;
const getModifierElementUpgradeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield modifierElementUpgrade_model_1.ModifierElementUpgradeModel.findByPk(id, {
        include: ['prices'],
    });
    if (response === null)
        throw new Error('ModifierElementUpgrade not found');
    return response;
});
const updateModifierElementUpgrade = (modifierElementUpgrade, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const transaction = yield ((_a = modifierElementUpgrade_model_1.ModifierElementUpgradeModel.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
    if (!transaction)
        throw new Error('Transaction not found');
    try {
        yield modifierElementUpgrade_model_1.ModifierElementUpgradeModel.update(modifierElementUpgrade, {
            where: { id },
        });
        const _d = yield getModifierElementUpgradeById(id), { prices } = _d, currentModifierElementUpgrade = __rest(_d, ["prices"]);
        const pricesToUpdate = ((_b = modifierElementUpgrade.prices) === null || _b === void 0 ? void 0 : _b.filter((price) => prices === null || prices === void 0 ? void 0 : prices.some((currentPrice) => currentPrice.id === price.id))) || [];
        const pricesToRemove = (prices === null || prices === void 0 ? void 0 : prices.filter((price) => { var _a; return !((_a = modifierElementUpgrade.prices) === null || _a === void 0 ? void 0 : _a.some((p) => p.id === price.id)); })) || [];
        const pricesToSave = ((_c = modifierElementUpgrade.prices) === null || _c === void 0 ? void 0 : _c.filter((price) => price.id === 0)) || [];
        if (pricesToRemove.length > 0)
            yield removePrices(Object.assign(Object.assign({}, currentModifierElementUpgrade), { prices: pricesToRemove }), transaction);
        if (pricesToUpdate.length > 0)
            yield updatePrices(Object.assign(Object.assign({}, currentModifierElementUpgrade), { prices: pricesToUpdate }), transaction);
        if (pricesToSave.length > 0)
            yield savePrices(Object.assign(Object.assign({}, currentModifierElementUpgrade), { prices: pricesToSave }), transaction, id);
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.updateModifierElementUpgrade = updateModifierElementUpgrade;
const deleteModifierElementUpgradeByModifierElementId = (modifierElementId) => __awaiter(void 0, void 0, void 0, function* () {
    yield modifierElementUpgrade_model_1.ModifierElementUpgradeModel.destroy({ where: { modifierElementId } });
});
exports.deleteModifierElementUpgradeByModifierElementId = deleteModifierElementUpgradeByModifierElementId;
const getModifierElementUpgradeByModiifierElementId = (modifierElementId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield modifierElementUpgrade_model_1.ModifierElementUpgradeModel.findOne({
        where: { modifierElementId },
    });
    return response;
});
exports.getModifierElementUpgradeByModiifierElementId = getModifierElementUpgradeByModiifierElementId;
const savePrices = (modifierElementUpgrade, transaction, id) => __awaiter(void 0, void 0, void 0, function* () {
    for (const price of modifierElementUpgrade.prices) {
        console.log(10, '-------upgradeid-----', id);
        yield (0, upgradeElementPrice_service_1.saveUpgradeElementPrice)(Object.assign(Object.assign({}, price), { upgradeId: id }), transaction);
    }
});
const updatePrices = (modifierElementUpgrade, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    for (const price of modifierElementUpgrade.prices) {
        yield (0, upgradeElementPrice_service_1.updateUpgradeElementPrice)(Object.assign(Object.assign({}, price), { upgradeId: modifierElementUpgrade.id }), price.id, transaction);
    }
});
const removePrices = (modifierElementUpgrade, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    for (const price of modifierElementUpgrade.prices) {
        yield (0, upgradeElementPrice_service_1.deleteUpgradeElementPrice)(price.id, transaction);
    }
});
