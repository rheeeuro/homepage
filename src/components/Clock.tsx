import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

export function Clock() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setClock();
  }, []);

  const setClock = () => {
    const [newDate, newTime] = getNow();
    setDate(newDate);
    setTime(newTime);
  };

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

  setInterval(setClock, 1000);

  return (
    <Container>
      <DateText>{date}</DateText>
      <TimeText>{time}</TimeText>
    </Container>
  );
}

const Container = tw.div`
w-52
hidden
md:flex
md:flex-row
md:items-center
text-center
text-slate-900
dark:text-slate-100
`;

const DateText = tw.h1`
mx-5
font-medium
`;

const TimeText = tw.h1`
text-xl
font-extrabold
`;

export default Clock;
