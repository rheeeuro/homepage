import { useState } from "react";
import tw from "tailwind-styled-components";

const Container = tw.div`
w-1/5
flex
flex-row
items-center
text-center
`;

const DateText = tw.h2`
mx-5
font-medium
`;

const TimeText = tw.h2`
text-xl
font-extrabold
`;

export function Clock() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  setInterval(() => {
    const [newDate, newTime] = getNow();
    setDate(newDate);
    setTime(newTime);
  }, 1000);

  const getNow = () => {
    const now: Date = new Date();

    const month = now.getMonth() + 1; // 월
    const date = now.getDate(); // 날짜
    const day = now.getDay(); // 요일

    const minutes = now.getMinutes();
    const hours = now.getHours();

    return [
      `${month}/${date}`,
      `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`,
    ];
  };

  return (
    <Container>
      <DateText>{date}</DateText>
      <TimeText>{time}</TimeText>
    </Container>
  );
}

export default Clock;
