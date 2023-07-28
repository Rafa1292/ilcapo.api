/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";

export const itemPriceRouter = express.Router();

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

export default itemPriceRouter;
