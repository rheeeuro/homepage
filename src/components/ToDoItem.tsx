import { memo } from "react";
import type { FC } from "react";
import { useDrag } from "react-dnd";
import tw from "tailwind-styled-components";
import { ItoDoItem } from "./ToDo";

const Container = tw.div<ContainerProps>`
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
group
${(p) => (p.$isDragging ? 0.5 : 1)}
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
hidden
group-hover:block
stroke-slate-700/70
hover:stroke-red-700/70
`;

interface ToDoItemProps {
  text: string;
  type: string;
  setToDoItems: React.Dispatch<React.SetStateAction<ItoDoItem[]>>;
  toDoItems: ItoDoItem[];
}

interface ContainerProps {
  $isDragging: boolean;
}

export const ToDoItem: FC<ToDoItemProps> = memo(function ToDoItem({
  text,
  type,
  setToDoItems,
  toDoItems,
}) {
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
    <Container ref={drag} $isDragging={isDragging}>
      <ToDoText>{text}</ToDoText>
      <DeleteButton onClick={deleteToDo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </DeleteButton>
    </Container>
  );
});

export default ToDoItem;
