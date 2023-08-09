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
exports.recoveryModifierGroup = exports.deleteModifierGroup = exports.updateModifierGroup = exports.saveModifierGroup = exports.getModifierGroupById = exports.getModifierGroupsWithDeletedItems = exports.getModifierGroups = void 0;
const modifierGroup_model_1 = require("../../db/models/modifierGroup.model");
const modifierGroup_factory_1 = require("../../factories/modifierGroup.factory");
const getModifierGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    const modifierGroups = yield modifierGroup_model_1.ModifierGroupModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'elements',
                include: [
                    'productReference', 'prices',
                    {
                        association: 'modifierUpgrade',
                        include: [
                            'prices'
                        ]
                    }
                ]
            }
        ]
    });
    return yield (0, modifierGroup_factory_1.toNewModifierGroups)(modifierGroups);
});
exports.getModifierGroups = getModifierGroups;
const getModifierGroupsWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield modifierGroup_model_1.ModifierGroupModel.findAll();
});
exports.getModifierGroupsWithDeletedItems = getModifierGroupsWithDeletedItems;
const getModifierGroupById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield modifierGroup_model_1.ModifierGroupModel.findByPk(id, {
        include: [
            {
                association: 'elements',
                include: [
                    {
                        association: 'modifierUpgrade'
                    },
                    {
                        association: 'productReference'
                    }
                ]
            }
        ]
    });
    if (response === null)
        throw new Error('ModifierGroup not found');
    if (response.delete)
        throw new Error('ModifierGroup deleted');
    return yield (0, modifierGroup_factory_1.toNewModifierGroup)(response);
});
exports.getModifierGroupById = getModifierGroupById;
const saveModifierGroup = (modifierGroup) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modifierGroup_model_1.ModifierGroupModel.create(modifierGroup);
});
exports.saveModifierGroup = saveModifierGroup;
const updateModifierGroup = (modifierGroup, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield modifierGroup_model_1.ModifierGroupModel.update(modifierGroup, { where: { id } });
});
exports.updateModifierGroup = updateModifierGroup;
const deleteModifierGroup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const modifierGroup = yield (0, exports.getModifierGroupById)(id);
    modifierGroup.delete = true;
    yield (0, exports.updateModifierGroup)(modifierGroup, id);
});
exports.deleteModifierGroup = deleteModifierGroup;
const recoveryModifierGroup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const modifierGroup = yield (0, exports.getModifierGroupById)(id);
    modifierGroup.delete = false;
    yield (0, exports.updateModifierGroup)(modifierGroup, id);
});
exports.recoveryModifierGroup = recoveryModifierGroup;
