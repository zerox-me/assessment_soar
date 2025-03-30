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

export interface User {
  avatar: string;
  name: string;
  email: string;
  dateOfBirth: string;
  permanentAddress: string;
  postalCode: string;
  username: string;
  password: string;
  presentAddress: string;
  city: string;
  country: string;
}

export const initialUserInfo: User = {
  avatar: '',
  name: '',
  email: '',
  dateOfBirth: '',
  permanentAddress: '',
  postalCode: '',
  username: '',
  password: '',
  presentAddress: '',
  city: '',
  country: '',
};