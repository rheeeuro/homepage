import { ReactNode, useState } from "react";
import { useDrop } from "react-dnd";
import tw from "tailwind-styled-components";
import { ItoDoItem } from "./ToDo";

const Container = tw.div`
w-1/4
flex
flex-col
items-center
rounded-md
py-3
px-1
bg-blue-100
shadow-xl
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

const NewText = tw.div`
absolute
w-11/12
`;

const NewInput = tw.input`
absolute
w-full
`;

const NewInputButton = tw.div`
absolute
right-2
`;

const NewCancelButton = tw.button`
mr-2
`;

const NewConfirmButton = tw.button`
`;

interface ToDoColumnProps {
  title: string;
  setToDoItems: React.Dispatch<React.SetStateAction<ItoDoItem[]>>;
  toDoItems: ItoDoItem[];
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
  const [adding, setAdding] = useState<boolean>(false);
  const [newToDo, setNewToDo] = useState<ItoDoItem>({
    text: "",
    column: title,
  });
  const [confirmEnabled, setConfirmEnabled] = useState<boolean>(false);
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

  const onChangeNewToDo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewToDo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setConfirmEnabled(true);
  };

  const confirmNew = () => {
    setToDoItems((prev) => [...prev, newToDo]);
    setNewToDo({
      text: "",
      column: title,
    });
    setAdding(false);
    setConfirmEnabled(false);
  };

  return (
    <Container ref={drop}>
      <TitleContainer>
        <Title>{title}</Title>
        {!adding && (
          <NewButton
            onClick={() => {
              setAdding(true);
            }}
          >
            New
          </NewButton>
        )}
        {adding && (
          <NewText>
            <NewInput name={"text"} onChange={onChangeNewToDo} />
            <NewInputButton>
              <NewCancelButton
                onClick={() => {
                  setAdding(false);
                }}
              >
                X
              </NewCancelButton>
              <NewConfirmButton onClick={confirmNew} disabled={!confirmEnabled}>
                V
              </NewConfirmButton>
            </NewInputButton>
          </NewText>
        )}
      </TitleContainer>
      <Items style={isOver ? { backgroundColor: "rgba(0, 0, 0, 0.1)" } : {}}>
        {children}
      </Items>
    </Container>
  );
}

export default ToDoColumn;
