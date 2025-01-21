export interface ITransactionTypes {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  type: string;
  amount: string;
  depositId: string;
}
