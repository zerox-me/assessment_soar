import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Contact } from "../../mock/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../common/carousel";

const QuickTransfer: React.FC = () => {
  const { data: contacts, status } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => axios.get("/api/contacts"),
  });

  const [amount, setAmount] = useState<number>(0);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const onHandleClickContact = (id: string) => {
    // TODO: Implement click contact
    setSelectedContact(id);
  };

  const onHandleSend = () => {
    // TODO: Implement send
    alert("Send");
  };

  if (status === "loading") {
    return (
      <div className="relative flex flex-col px-6 py-8 bg-white rounded-3xl animate-pulse">
        <div className="flex flex-col">
          <div className="relative flex mb-4 space-x-4 overflow-x-auto pb-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="flex items-center justify-between gap-2" key={index}>
                <div>
                  <div
                    className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") return <div>Error...</div>;

  return (
    <div className="relative flex flex-col px-6 py-6 bg-white rounded-3xl">
      <div className="flex flex-col">
        <Carousel
          className="mb-4"
          opts={{
            align: "center",
          }}
        >
          <CarouselContent className="ml-0">
            {contacts?.data.map((contact: Contact) => (
              <CarouselItem
                key={contact.id}
                onClick={() => onHandleClickContact(contact.id)}
                className="flex flex-col basis-1/3"
              >
                <div className="flex flex-col items-center rounded-xl p-2 cursor-pointer hover:bg-label-icon transition-colors duration-300">
                  <div className="flex overflow-hidden w-16 h-16 mb-4 rounded-full">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <p
                      className={`text-center text-label-title truncate rounded-xl ${
                        selectedContact === contact.id ? "font-bold" : ""
                      }`}
                    >
                      {contact.name}
                    </p>
                    <p
                      className={`text-center text-label-secondary truncate rounded-xl ${
                        selectedContact === contact.id ? "font-bold" : ""
                      }`}
                    >
                      {contact.role}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 w-12 h-12 bg-white border-none shadow-md disabled:opacity-100 disabled:text-gray-200 hover:shadow-xl transition-shadow duration-300" />
          <CarouselNext className="right-0 w-12 h-12 bg-white border-none shadow-md disabled:opacity-100 disabled:text-gray-200 hover:shadow-xl transition-shadow duration-300" />
        </Carousel>

        <div className="flex justify-between items-center space-x-4">
          <p className="text-label-secondary pl-6">Write Amount</p>
          <div className="relative">
            <input
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              className="w-64 h-12 px-8 text-label-title bg-label-icon rounded-full focus:outline-none focus:border focus:border-gray-300"
            />
            <button
              className="absolute top-0 right-0 flex items-center justify-center w-32 h-12 space-x-2 bg-label-primary rounded-full hover:bg-label-primary/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={amount <= 0 || !selectedContact}
              onClick={() => onHandleSend()}
            >
              <span className="text-white">Send</span>
              <img src="/images/icon_send.svg" alt="Send" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;
