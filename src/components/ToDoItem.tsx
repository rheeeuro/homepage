import { memo } from "react";
import type { FC } from "react";
import { useDrag } from "react-dnd";
import tw from "tailwind-styled-components";
import { ItoDoItem } from "./ToDo";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ToDoItemProps {
  text: string;
  type: string;
  setToDoItems: React.Dispatch<React.SetStateAction<ItoDoItem[]>>;
}

interface ContainerProps {
  $isDragging: boolean;
}

export const ToDoItem: FC<ToDoItemProps> = memo(function ToDoItem({
  text,
  type,
  setToDoItems,
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
    const confirm = window.confirm(
      `Are you sure you want to delete [${text}]?`
    );
    if (!confirm) return;

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
        <CustomTrashIcon />
      </DeleteButton>
    </Container>
  );
});

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
dark:bg-slate-600
shadow-md
group
${(p) => (p.$isDragging ? 0.5 : 1)}
transition-colors
`;

const ToDoText = tw.p`
font-normal
text-sm
text-[#383c40]
dark:text-slate-100
w-11/12
overflow-clip
overflow-ellipsis
transition-colors
`;

const DeleteButton = tw.button`
text-xs
hidden
group-hover:block
text-slate-700/70
dark:text-slate-400/70
hover:text-red-700/70
dark:hover:text-red-400/70
transition-colors
`;

const CustomTrashIcon = tw(TrashIcon)`
w-5
h-5
`;

export default ToDoItem;
