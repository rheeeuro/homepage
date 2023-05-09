import { ReactNode } from "react";
import tw from "tailwind-styled-components";

const Container = tw.div`
w-[3/10]
flex
flex-col
items-center
rounded-md
bg-pink-200
`;

const Items = tw.div`
w-full
h-full
overflow-y-hidden
bg-yellow-200
`;

interface ToDoColumnProps {
  children: ReactNode;
}

export function ToDoColumn({ children }: ToDoColumnProps) {
  return (
    <Container>
      <Items>{children}</Items>
    </Container>
  );
}

export default ToDoColumn;
