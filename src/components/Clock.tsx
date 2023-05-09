import tw from "tailwind-styled-components";

const Container = tw.div`
w-1/5
flex
flex-row
items-center
text-center
`;

const Date = tw.h1`
mx-5
font-medium
`;

const Time = tw.h1`
text-xl
font-extrabold
`;

export function Clock() {
  return (
    <Container>
      <Date>5/9</Date>
      <Time>11:56</Time>
    </Container>
  );
}

export default Clock;
