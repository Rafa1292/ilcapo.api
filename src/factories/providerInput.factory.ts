import { ProviderInput } from '../services/providerInput/providerInput.types'

export const toNewProviderInput = async (providerInput: any): Promise<ProviderInput> => {
  return {
    id: providerInput.id,
    createdBy: providerInput.createdBy,
    updatedBy: providerInput.updatedBy,
    measureId: providerInput.measureId,
    lowerPrice: providerInput.lowerPrice,
    upperPrice: providerInput.upperPrice,
    currentPrice: providerInput.currentPrice,
    lastPrice: providerInput.lastPrice,
    expectedPrice: providerInput.expectedPrice,
    presentation: providerInput.presentation,
    createdAt: providerInput.createdAt,
    updatedAt: providerInput.updatedAt,
    delete: providerInput.delete,
    inputId: providerInput.inputId,
    providerId: providerInput.providerId,
    brandId: providerInput.brandId
  }
}

export const toNewProviderInputs = async (providerInputs: any[]): Promise<ProviderInput[]> => {
  return await Promise.all(providerInputs.map(async (providerInput: any) => {
    return await toNewProviderInput(providerInput)
  }))
}
