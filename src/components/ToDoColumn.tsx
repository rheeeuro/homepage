import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import tw from "tailwind-styled-components";
import { ToDoItem } from "./ToDo";

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
  setToDoItems: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
  toDoItems: ToDoItem[];
  children: ReactNode;
}

interface DropProps {
  text: string;
}

export function ToDoColumn({
  title,
  setToDoItems,
  toDoItems,
  children,
}: ToDoColumnProps) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "todo",
      drop: (a: DropProps) => {
        console.log(a.text, title);
        moveToDo(a.text, title);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [title]
  );

  const moveToDo = (text: string, dest: string) => {
    setToDoItems((prev) => [
      ...prev.filter((item) => item.text !== text),
      { text: text, column: dest },
    ]);
  };

  return (
    <Container ref={drop}>
      <TitleContainer>
        <Title>{title}</Title>
        <NewButton>New</NewButton>
      </TitleContainer>
      <Items style={isOver ? { backgroundColor: "rgba(0, 0, 0, 0.1)" } : {}}>
        {children}
      </Items>
    </Container>
  );
}

export default ToDoColumn;
