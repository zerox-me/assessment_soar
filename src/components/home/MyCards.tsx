import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import "../../mock/mock";
import { CardData } from "../../mock/types";
import { Carousel, CarouselContent, CarouselItem } from "../common/carousel";


const Card: React.FC<CardData> = ({
  id,
  balance,
  cardHolder,
  validThru,
  cardNumber,
  isActive = true,
}) => {
  const bgColorClass = isActive
    ? "bg-gradient-to-br from-[#5B5A6F] to-black"
    : "bg-white border border-[#DFEAF2]";
  const textColorClass = isActive ? "text-white" : "text-[#2D2D3F]";

  return (
    <div
      className={`${bgColorClass} rounded-3xl relative overflow-hidden cursor-pointer`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className={`${textColorClass} text-xs`}>Balance</p>
            <p className={`${textColorClass} text-xl font-semibold`}>
              ${balance.toLocaleString()}
            </p>
          </div>
          <div>
            <img
              src={
                isActive
                  ? "/images/icon_chip_card_light.png"
                  : "/images/icon_chip_card_dark.png"
              }
              alt="Card Chip"
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <p
              className={`${
                isActive ? "text-white/70" : textColorClass
              } text-xs`}
            >
              CARD HOLDER
            </p>
            <p className={`${textColorClass} font-semibold`}>{cardHolder}</p>
          </div>

          <div>
            <p
              className={`${
                isActive ? "text-white/70" : textColorClass
              } text-xs`}
            >
              VALID THRU
            </p>
            <p className={`${textColorClass} font-semibold`}>{validThru}</p>
          </div>
        </div>
      </div>
      <div
        className={`${
          isActive
            ? "bg-gradient-to-b from-white/15 to-transparent"
            : "border-t border-[#DFEAF2]"
        } px-6 py-5 flex justify-between`}
      >
        <p className={`${textColorClass} font-medium text-xl tracking-wider`}>
          {cardNumber.slice(0, 4)} **** **** {cardNumber.slice(12, 16)}
        </p>
        <div className="relative">
          <div
            className={`w-[30px] h-[30px] rounded-full ${
              isActive ? "bg-white" : "bg-[#9199AF]"
            } opacity-50 absolute right-[15px]`}
          ></div>
          <div
            className={`w-[30px] h-[30px] rounded-full ${
              isActive ? "bg-white" : "bg-[#9199AF]"
            } opacity-50`}
          ></div>
        </div>
      </div>
    </div>
  );
};

const MyCards: React.FC = () => {
  const { data: cards, status } = useQuery({
    queryKey: ["cards"],
    queryFn: () => axios.get("/api/cards"),
  });

  if (status === "loading") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        <div className="h-60 bg-gray-200 rounded-2xl"></div>
        <div className="h-60 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }
  
  if (status === "error") return <div>Error...</div>;

  return (
    <Carousel opts={{
      loop: true,
      align: "start",
    }}>
      <CarouselContent>
        {
          cards?.data.map((card: CardData, index: number) => (
            <CarouselItem className="basis-1/2" key={index}>
              <Card {...card} />
            </CarouselItem>
          ))
        }
      </CarouselContent>
    </Carousel>
  );
};

export default MyCards;
