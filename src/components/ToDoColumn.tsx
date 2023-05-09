import { ReactNode } from "react";
import tw from "tailwind-styled-components";

const Container = tw.div`
w-1/4
flex
flex-col
items-center
rounded-md
py-3
px-1
bg-blue-100
`;

const Items = tw.div`
w-full
h-full
overflow-y-scroll
`;

const TitleContainer = tw.div`
w-full
flex
flex-col
items-center
relative
mb-3
`;

const Title = tw.h1`
font-semibold
text-xl
`;

const NewButton = tw.button`
absolute
right-3
font-light
text-xs
text-gray-500
hover:text-gray-700
`;

interface ToDoColumnProps {
  title: string;
  children: ReactNode;
}

export function ToDoColumn({ title, children }: ToDoColumnProps) {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <NewButton>New</NewButton>
      </TitleContainer>
      <Items>{children}</Items>
    </Container>
  );
}

export default ToDoColumn;
