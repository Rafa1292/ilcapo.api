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
exports.recoveryModifierElement = exports.deleteModifierElement = exports.updateModifierElement = exports.saveModifierElement = exports.getModifierElementById = exports.getModifierElementsWithDeletedItems = exports.getModifierElements = void 0;
const modifierElement_model_1 = require("../../db/models/modifierElement.model");
const modifierElement_factory_1 = require("../../factories/modifierElement.factory");
const getModifierElements = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield modifierElement_model_1.ModifierElementModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'modifierElementUpgrade'
            }
        ]
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
        include: [
            'modifierElementUpgrade', 'productReference'
        ]
    });
    if (response === null)
        throw new Error('ModifierElement not found');
    return yield (0, modifierElement_factory_1.toNewModifierElement)(response);
});
exports.getModifierElementById = getModifierElementById;
const saveModifierElement = (modifierElement) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modifierElement_model_1.ModifierElementModel.create(modifierElement);
});
exports.saveModifierElement = saveModifierElement;
const updateModifierElement = (modifierElement, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield modifierElement_model_1.ModifierElementModel.update(modifierElement, { where: { id } });
});
exports.updateModifierElement = updateModifierElement;
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
