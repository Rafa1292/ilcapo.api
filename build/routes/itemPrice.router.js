"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemPriceRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
exports.itemPriceRouter = express_1.default.Router();
// itemPriceRouter.post(
//   "/",
//   async (req: Request, res: Response): Promise<void> => {
//     const response = responseFactory.toNewCustomResponse();
//     try {
//       const { id, ...newItemPrice } = await itemPriceFactory.toNewItemPrice(
//         req.body
//       );
//       const itemPrice = await itemPriceService.saveItemPrice(newItemPrice);
//       response.setResponse(itemPrice, ["ItemPrice saved successfully"], false);
//     } catch (error) {
//       errorHandler(error);
//     }
//     res.send(response);
//   }
// );
// itemPriceRouter.put("/", async (req: Request, res: Response): Promise<void> => {
//   const response = responseFactory.toNewCustomResponse();
//   try {
//     const updateItemPrice = await itemPriceFactory.toNewItemPrice(req.body);
//     const updatedItemPrice = await itemPriceService.updateItemPrice(
//       updateItemPrice
//     );
//     response.setResponse(
//       updatedItemPrice,
//       ["ItemPrice updated successfully"],
//       false
//     );
//   } catch (error) {
//     errorHandler(error);
//   }
//   res.send(response);
// });
exports.default = exports.itemPriceRouter;
