import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

export const newProviderIsValid = (provider: any): boolean => {
  parseName(provider.name)
  return true
}
