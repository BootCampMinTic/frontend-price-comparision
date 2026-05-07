import { ProductSale } from './product-sale';

export interface Sale {
  id: number;
  userId: number;
  userName?: string;
  storeId: number;
  storeName?: string;
  stateId: number;
  stateDescription?: string;
  date: string;
  products: ProductSale[];
}
