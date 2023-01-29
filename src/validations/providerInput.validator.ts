import { getProviderInputByProviderIdAndInputId } from '../services/providerInput/providerInput.service'

export const newProviderInputIsValid = async (Providerinput: any): Promise<void> => {
  const providerInput = await getProviderInputByProviderIdAndInputId(Providerinput.providerId, Providerinput.inputId)

  if (providerInput !== null) {
    throw new Error('Este proveedor ya tiene este insumo, para activarlo nuevamente dirigete a la sección de proveedores, insumos eliminados y activalo nuevamente')
  }
}
