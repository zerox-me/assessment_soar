import { CardData, Contact, Transaction, TransactionMethod, TransactionType } from "./types";

export const mock_cards: CardData[] = [
  {
    id: "id-1",
    balance: 5756,
    cardHolder: "Eddy Cusuma",
    validThru: "12/22",
    cardNumber: "3778549828501234",
    isActive: true,
  },
  {
    id: "id-2",
    balance: 1263,
    cardHolder: "Roger Dale",
    validThru: "06/11",
    cardNumber: "147795823781234",
    isActive: false,
  },
  {
    id: "id-3",
    balance: 76532,
    cardHolder: "Sebastian R",
    validThru: "12/22",
    cardNumber: "9573589123456789",
    isActive: false,
  },
  {
    id: "id-4",
    balance: 8434,
    cardHolder: "Rody Ranger",
    validThru: "02/22",
    cardNumber: "6958374871291234",
    isActive: false,
  },
];

export const mock_transactions: Transaction[] = [
  {
    id: 'id-1',
    method: TransactionMethod.Card,
    title: "Deposit from my Card",
    date: "28 January 2021",
    amount: 850,
    type: TransactionType.Withdraw,
  },
  {
    id: 'id-2',
    method: TransactionMethod.Paypal,
    title: "Deposit Paypal",
    date: "25 January 2021",
    amount: 2500,
    type: TransactionType.Deposit,
  },
  {
    id: 'id-3',
    method: TransactionMethod.Cash,
    title: "Jemi Wilson",
    date: "21 January 2021",
    amount: 5400,
    type: TransactionType.Deposit,
  },
  {
    id: 'id-4',
    method: TransactionMethod.Card,
    title: "Deposit from my Card",
    date: "28 January 2021",
    amount: 850,
    type: TransactionType.Withdraw,
  },
  {
    id: 'id-5',
    method: TransactionMethod.Paypal,
    title: "Deposit Paypal",
    date: "25 January 2021",
    amount: 2500,
    type: TransactionType.Deposit,
  },
  {
    id: 'id-6',
    method: TransactionMethod.Cash,
    title: "Jemi Wilson",
    date: "21 January 2021",
    amount: 5400,
    type: TransactionType.Deposit,
  },
];

export const mock_contacts: Contact[] = [
  {
    id: "id-1",
    name: "Livia Bator",
    role: "CEO",
    avatar: "/images/avatar_livia.png",
  },
  {
    id: "id-2",
    name: "Randy Press",
    role: "Director",
    avatar: "/images/avatar_randy.png",
  },
  {
    id: "id-3",
    name: "Workman",
    role: "Designer",
    avatar: "/images/avatar_workman.png",
  },
  {
    id: "id-4",
    name: "Livia Bator",
    role: "CEO",
    avatar: "/images/avatar_livia.png",
  },
  {
    id: "id-5",
    name: "Randy Press",
    role: "Director",
    avatar: "/images/avatar_randy.png",
  },
  {
    id: "id-6",
    name: "Workman",
    role: "Designer",
    avatar: "/images/avatar_workman.png",
  },
  {
    id: "id-7",
    name: "Livia Bator",
    role: "CEO",
    avatar: "/images/avatar_livia.png",
  },
  {
    id: "id-8",
    name: "Randy Press",
    role: "Director",
    avatar: "/images/avatar_randy.png",
  },
  {
    id: "id-9",
    name: "Workman",
    role: "Designer",
    avatar: "/images/avatar_workman.png",
  },
];

export const mock_expense_statistics = [37, 25, 13, 25];

export const mock_weekly_activity = {
  withdraw: [400, 320, 300, 450, 150, 350, 400],
  deposit: [220, 120, 250, 350, 200, 230, 350],
};

export const mock_balance_history = [300, 400, 350, 700, 250, 500, 600];
