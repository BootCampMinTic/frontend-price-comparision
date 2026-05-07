export interface CreateSale {
  userId: number;
  storeId: number;
  stateId: number;
  date: string;
  productIds: number[];
}
