import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mock_contacts, mock_cards, mock_transactions, mock_expense_statistics, mock_weekly_activity, mock_balance_history } from "./data";

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet("/api/user").reply(200, {
    id: 1,
    name: "Roger",
    username: "theroger",
    email: "theroger@gmail.com",
    password: "12345678",
    dob: "1990-01-01",
    presentAddress: "123 Main St, Anytown, USA",
    permanentAddress: "123 Main St, Anytown, USA",
    postalCode: "45692",
    city: "Anytown",
    country: "USA",
});

mock.onGet("/api/cards").reply(200, mock_cards);

mock.onGet("/api/transactions").reply(200, mock_transactions);

mock.onGet("/api/contacts").reply(200, mock_contacts);

mock.onGet("/api/expense-statistics").reply(200, mock_expense_statistics);

mock.onGet("/api/weekly-activity").reply(200, mock_weekly_activity);

mock.onGet("/api/balance-history").reply(200, mock_balance_history);

export default mock;