import { useState, memo } from "react";
import type { FC } from "react";
import { useDrag } from "react-dnd";
import tw from "tailwind-styled-components";
import { ItoDoItem } from "./ToDo";

const Container = tw.div`
w-auto
h-12
m-2
p-2
rounded-lg
text-center
flex
flex-row
items-center
justify-between
bg-slate-400
shadow-md
`;

const ToDoText = tw.p`
font-medium
text-lg
w-11/12
overflow-clip
overflow-ellipsis
`;

const DeleteButton = tw.button`
text-xs
`;

interface ToDoItemProps {
  text: string;
  type: string;
  setToDoItems: React.Dispatch<React.SetStateAction<ItoDoItem[]>>;
  toDoItems: ItoDoItem[];
}

export const ToDoItem: FC<ToDoItemProps> = memo(function ToDoItem({
  text,
  type,
  setToDoItems,
  toDoItems,
}) {
  const [hover, setHover] = useState<boolean>(false);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type,
      item: { text },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [text, type]
  );

  const deleteToDo = () => {
    setToDoItems((prev) => {
      const newOne = prev.filter((item) => item.text !== text);
      localStorage.setItem("todos", JSON.stringify(newOne));
      return newOne;
    });
  };

  return (
    <Container
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <ToDoText>{text}</ToDoText>
      <DeleteButton
        style={hover ? { display: "block" } : { display: "none" }}
        onClick={deleteToDo}
      >
        ❌
      </DeleteButton>
    </Container>
  );
});

export default ToDoItem;
