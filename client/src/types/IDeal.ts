export interface IDeal {
  id: number;
  title: string;
  photo: string;
  amount: number;
  days_left: number;
  sold_percentage: number;
  yield: number;
}

export interface IDealResponse {
  deals: IDeal[];
}
