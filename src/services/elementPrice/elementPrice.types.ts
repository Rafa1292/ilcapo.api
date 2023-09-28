import {traceFields} from '../../utils/genericTypes/traceFields.type';
export interface ElementPriceAttributes {
    id: number
    elementId: number
    menuId: number
    price: number
    delete: boolean
    createdAt?: string
    updatedAt?: string
    createdBy?: number
    updatedBy?: number
  }
    
  export interface ElementPrice extends Omit<ElementPriceAttributes, keyof typeof traceFields> { }  