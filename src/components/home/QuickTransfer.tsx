import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Contact } from "../../mock/types";

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
    alert('Send');
  };

  if (status === "loading") {
    return (
      <div className="relative flex flex-col px-6 py-8 bg-white rounded-3xl animate-pulse">
        <div className="flex flex-col">
          <div className="relative flex mb-4 space-x-4 overflow-x-auto pb-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl`}></div>
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
    <div className="relative flex flex-col px-6 py-8 bg-white rounded-3xl">
      <div className="flex flex-col">
        <div className="relative flex mb-4 space-x-4 overflow-x-auto pb-3">
          {contacts?.data.map((contact: Contact) => (
            <button
              key={contact.id}
              onClick={() => onHandleClickContact(contact.id)}
              className="flex flex-col items-center min-w-[100px] rounded-xl p-2 cursor-pointer hover:bg-[#F5F6FA] transition-colors duration-300"
            >
              <div className="flex overflow-hidden w-16 h-16 mb-4 rounded-full">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col items-center">
                <p
                  className={`text-center truncate max-w-[100px] rounded-xl ${
                    selectedContact === contact.id ? "font-bold" : ""
                  }`}
                >
                  {contact.name}
                </p>
                <p
                  className={`text-center text-[#9199AF] truncate max-w-[100px] rounded-xl ${
                    selectedContact === contact.id ? "font-bold" : ""
                  }`}
                >
                  {contact.role}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center space-x-4">
          <p className="text-[#2D2D3F]">Write Amount</p>
          <div className="relative">
            <input
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              className="w-64 h-[50px] px-[30px] text-[#2D2D3F] bg-[#F5F6FA] rounded-full focus:outline-none"
            />
            <button
              className="absolute top-0 right-0 flex items-center justify-center w-[125px] h-[50px] space-x-2 bg-[#232323] rounded-full hover:bg-[#232323]/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
