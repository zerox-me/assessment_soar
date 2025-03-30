export interface CardData {
  id: string;
  balance: number;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
  isActive?: boolean;
}

export enum TransactionMethod {
  Card = "Card",
  Paypal = "Paypal",
  Cash = "Cash",
}

export enum TransactionType {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
}

export interface Transaction {
  id: string;
  method: TransactionMethod;
  title: string;
  date: string;
  amount: number;
  type: TransactionType;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
}
