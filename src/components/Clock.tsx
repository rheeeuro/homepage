import { useState } from "react";
import tw from "tailwind-styled-components";

export function Clock() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [day, setDay] = useState<string>("");

  setInterval(() => {
    const [newDate, newTime, newDay] = getNow();
    setDate(newDate);
    setTime(newTime);
    setDay(newDay);
  }, 1000);

  const getNow = () => {
    const now: Date = new Date();
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const month = now.getMonth() + 1; // 월
    const date = now.getDate(); // 날짜
    const day = now.getDay(); // 요일

    const minutes = now.getMinutes();
    const hours = now.getHours();
    const seconds = now.getSeconds();

    const newhours = hours > 12 ? hours - 12 : hours;

    return [
      `${month}/${date}`,
      `${newhours < 10 ? `0${newhours}` : newhours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds} ${hours > 12 ? "PM" : "AM"}`,
      days[day],
    ];
  };

  return (
    <Container>
      <DateText>{date}</DateText>
      <DayText>{day}</DayText>
      <TimeText>{time}</TimeText>
    </Container>
  );
}

const Container = tw.div`
w-60
hidden
md:flex
md:flex-row
md:items-center
text-center
pl-5
`;

const DateText = tw.h1`
hidden
xl:block
mr-1
font-medium
text-md
`;

const DayText = tw.h1`
hidden
xl:block
text-sm
font-light
italic
ml-1
mr-6
`;

const TimeText = tw.h1`
text-lg
font-light
`;

export default Clock;
