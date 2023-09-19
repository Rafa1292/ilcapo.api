import {traceFields} from '../../utils/genericTypes/traceFields.type';
export interface ElementPriceAttributes {
    id: number
    elementId: number
    menuId: number
    price: number
    delete: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: number
    updatedBy?: number
  }
    
  export interface ElementPrice extends Omit<ElementPriceAttributes, keyof typeof traceFields> { }  