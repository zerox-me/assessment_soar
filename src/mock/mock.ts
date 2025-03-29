import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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

export default mock;