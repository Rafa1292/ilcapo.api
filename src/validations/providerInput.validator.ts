import { getProviderInputByProviderIdAndInputIdAndBrandId } from '../services/providerInput/providerInput.service'

export const newProviderInputIsValid = async (ProviderInputParams: any): Promise<void> => {
  const providerInput = await getProviderInputByProviderIdAndInputIdAndBrandId(ProviderInputParams.id, ProviderInputParams.providerId,
    ProviderInputParams.inputId, ProviderInputParams.brandId)

  if (providerInput !== null) {
    throw new Error('Este proveedor ya tiene este insumo, para activarlo nuevamente dirigete a la sección de proveedores, insumos eliminados y activalo nuevamente')
  }
}
