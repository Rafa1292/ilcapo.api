import { Input } from '../services/input/input.types'
import * as inputValidator from '../validations/input.validator'

export const toNewInput = async (input: any): Promise<Input> => {
  await inputValidator.newInputIsValid(input)

  return {
    id: input.id,
    name: input.name,
    measureId: input.measureId,
    lowerPrice: input.lowerPrice,
    upperPrice: input.upperPrice,
    currentPrice: input.currentPrice,
    lastPrice: input.lastPrice,
    expectedPrice: input.expectedPrice,
    stock: input.stock,
    presentation: input.presentation,
    suggestedStock: input.suggestedStock,
    currentProviderId: input.currentProviderId,
    inputCategoryId: input.inputCategoryId,
    createdBy: input.createdBy,
    updatedBy: input.updatedBy,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
    delete: input.delete
  }
}
