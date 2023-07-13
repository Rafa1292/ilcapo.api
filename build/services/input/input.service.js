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
exports.recoveryInput = exports.deleteInput = exports.updateInput = exports.saveInput = exports.getInputById = exports.getInputsWithDeletedItems = exports.getInputs = void 0;
const input_model_1 = require("../../db/models/input.model");
const input_factory_1 = require("../../factories/input.factory");
const getInputs = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield input_model_1.InputModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'measure'
            }
        ]
    });
});
exports.getInputs = getInputs;
const getInputsWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield input_model_1.InputModel.findAll();
});
exports.getInputsWithDeletedItems = getInputsWithDeletedItems;
const getInputById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield input_model_1.InputModel.findByPk(id);
    if (response === null)
        throw new Error('Input not found');
    if (response.delete)
        throw new Error('Input deleted');
    return yield (0, input_factory_1.toNewInput)(response);
});
exports.getInputById = getInputById;
const saveInput = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield input_model_1.InputModel.create(input);
});
exports.saveInput = saveInput;
const updateInput = (input, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield input_model_1.InputModel.update(input, { where: { id } });
});
exports.updateInput = updateInput;
const deleteInput = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const input = yield (0, exports.getInputById)(id);
    input.delete = true;
    yield (0, exports.updateInput)(input, id);
});
exports.deleteInput = deleteInput;
const recoveryInput = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const input = yield (0, exports.getInputById)(id);
    input.delete = false;
    yield (0, exports.updateInput)(input, id);
});
exports.recoveryInput = recoveryInput;
