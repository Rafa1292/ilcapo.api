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
exports.recoveryMagnitude = exports.getMagnitudesWithDeletedItems = exports.deleteMagnitude = exports.updateMagnitude = exports.saveMagnitude = exports.getMagnitudeById = exports.getMagnitudes = void 0;
const magnitude_model_1 = require("../../db/models/magnitude.model");
const magnitude_factory_1 = require("../../factories/magnitude.factory");
const timeManager_1 = require("../../utils/timeManager");
const getMagnitudes = () => __awaiter(void 0, void 0, void 0, function* () {
    const magnitudes = yield magnitude_model_1.MagnitudeModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                all: true
            }
        ]
    });
    return yield (0, magnitude_factory_1.toNewMagnitudes)(magnitudes);
});
exports.getMagnitudes = getMagnitudes;
const getMagnitudeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield magnitude_model_1.MagnitudeModel.findByPk(id);
    if (response === null)
        throw new Error('Magnitude not found');
    if (response.delete)
        throw new Error('Magnitude deleted');
    return yield (0, magnitude_factory_1.toNewMagnitude)(response);
});
exports.getMagnitudeById = getMagnitudeById;
const saveMagnitude = (magnitude) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    magnitude.createdAt = now;
    magnitude.updatedAt = now;
    const savedMagnitude = yield magnitude_model_1.MagnitudeModel.create(magnitude);
    return yield (0, magnitude_factory_1.toNewMagnitude)(savedMagnitude);
});
exports.saveMagnitude = saveMagnitude;
const updateMagnitude = (magnitude, id) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    magnitude.updatedAt = now;
    yield magnitude_model_1.MagnitudeModel.update(magnitude, { where: { id } });
});
exports.updateMagnitude = updateMagnitude;
const deleteMagnitude = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const magnitude = yield (0, exports.getMagnitudeById)(id);
    const now = (0, timeManager_1.getNow)();
    magnitude.updatedAt = now;
    magnitude.delete = true;
    yield (0, exports.updateMagnitude)(magnitude, id);
});
exports.deleteMagnitude = deleteMagnitude;
const getMagnitudesWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const magnitudes = yield magnitude_model_1.MagnitudeModel.findAll();
    return magnitudes;
});
exports.getMagnitudesWithDeletedItems = getMagnitudesWithDeletedItems;
const recoveryMagnitude = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const magnitude = yield (0, exports.getMagnitudeById)(id);
    const now = (0, timeManager_1.getNow)();
    magnitude.updatedAt = now;
    magnitude.delete = false;
    yield (0, exports.updateMagnitude)(magnitude, id);
});
exports.recoveryMagnitude = recoveryMagnitude;
