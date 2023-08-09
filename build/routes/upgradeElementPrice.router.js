"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeElementPriceRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
exports.upgradeElementPriceRouter = express_1.default.Router();
// upgradeElementPriceRouter.post(
//   "/",
//   async (req: Request, res: Response): Promise<void> => {
//     const response = responseFactory.toNewCustomResponse();
//     try {
//       const {id, ... newItemPrice} = await upgradeElementPriceFactory.toNewUpgradeElementPrice(req.body);
//       const upgradeElementPrice = await upgradeElementPriceService.saveUpgradeElementPrice(newItemPrice);
//       response.setResponse(upgradeElementPrice, ["UpgradeElementPrice saved successfully"], false);
//     } catch (error) {
//       errorHandler(error);
//     }
//     res.send(response);
//   }
// );
// upgradeElementPriceRouter.put(
//   "/",
//   async (req: Request, res: Response): Promise<void> => {
//     const response = responseFactory.toNewCustomResponse();
//     try {
//       const updateupgradeElementPrice = await upgradeElementPriceFactory.toNewUpgradeElementPrice(req.body);
//       const updatedUpgradeElementPrice = await upgradeElementPriceService.updateUpgradeElementPrice(updateupgradeElementPrice);
//       response.setResponse(updatedUpgradeElementPrice, ["UpgradeElementPrice updated successfully"], false);
//     } catch (error) {
//       errorHandler(error);
//     }
//     res.send(response);
//   });
exports.default = exports.upgradeElementPriceRouter;
