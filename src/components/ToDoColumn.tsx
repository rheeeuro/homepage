import { ReactNode, useEffect, useState } from "react";
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
bg-blue-100/[0.8]
shadow-xl
`;

const Items = tw.div`
w-full
h-full
overflow-y-scroll
`;

const TitleContainer = tw.div`
w-full
h-10
flex
flex-col
justify-center
items-center
relative
mb-3
`;

const Title = tw.h1`
font-semibold
text-xl
w-full
text-center
`;

const NewButton = tw.button`
absolute
right-3
font-light
text-xs
text-gray-500
hover:text-gray-700
`;

const NewText = tw.form`
absolute
w-11/12
h-full
flex
flex-row
items-center
`;

const NewInput = tw.input`
absolute
w-full
h-8
pr-11
pl-2
rounded-md
shadow-sm
`;

const NewInputButton = tw.div`
absolute
right-2
flex
flex-row
justify-center
`;

const NewCancelButton = tw.button`
mr-1
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
        moveToDo(a.text, title);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [title]
  );

  useEffect(() => {
    setConfirmEnabled(newToDo.text !== "");
  }, [newToDo]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      cancelNew();
    });
  }, []);

  const moveToDo = (text: string, dest: string) => {
    setToDoItems((prev) => {
      const newOne = [
        ...prev.filter((item) => item.text !== text),
        { text: text, column: dest },
      ];
      localStorage.setItem("todos", JSON.stringify(newOne));
      return newOne;
    });
  };

  const onChangeNewToDo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewToDo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const cancelNew = () => {
    setNewToDo({
      text: "",
      column: title,
    });
    setAdding(false);
  };

  const confirmNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newToDo.text === "") return;
    console.log("a");
    setToDoItems((prev) => {
      const newOne = [...prev, newToDo];
      localStorage.setItem("todos", JSON.stringify(newOne));
      return newOne;
    });

    setNewToDo({
      text: "",
      column: title,
    });
    setAdding(false);
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
          <NewText onSubmit={confirmNew} autoComplete="off">
            <NewInput
              name={"text"}
              onChange={onChangeNewToDo}
              value={newToDo.text}
              placeholder="Type new item.."
            />
            <NewInputButton>
              <NewCancelButton type="button" onClick={cancelNew}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </NewCancelButton>
              <NewConfirmButton type="submit" disabled={!confirmEnabled}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="green"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
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
