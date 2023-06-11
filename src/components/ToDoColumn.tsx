import { ReactNode, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import tw from "tailwind-styled-components";
import { ItoDoItem } from "./ToDo";
import { useForm } from "react-hook-form";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ToDoColumnProps {
  title: string;
  setToDoItems: React.Dispatch<React.SetStateAction<ItoDoItem[]>>;
  children: ReactNode;
}

interface DropProps {
  text: string;
}

interface NewToDoFormProps {
  text: string;
}

export function ToDoColumn({ title, setToDoItems, children }: ToDoColumnProps) {
  const { register, handleSubmit, reset } = useForm<NewToDoFormProps>();
  const [adding, setAdding] = useState<boolean>(false);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "todo",
      drop: (item: DropProps) => {
        moveToDo(item.text, title);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [title]
  );

  useEffect(() => {
    function escEvent(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      closeInput();
    }
    document.addEventListener("keydown", escEvent);
    return () => {
      document.removeEventListener("keydown", escEvent);
    };
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

  const closeInput = () => {
    reset();
    setAdding(false);
  };

  const onValid = (data: NewToDoFormProps) => {
    setToDoItems((prev) => {
      const newOne = [...prev, { column: title, text: data.text }];
      localStorage.setItem("todos", JSON.stringify(newOne));
      return newOne;
    });
    closeInput();
  };

  return (
    <Container ref={drop}>
      <TitleContainer>
        <Title>{title.toUpperCase()}</Title>
        {!adding && (
          <NewButton
            onClick={() => {
              setAdding(true);
            }}
          >
            <CustomPlusIcon />
          </NewButton>
        )}
        {adding && (
          <NewText onSubmit={handleSubmit(onValid)} autoComplete="off">
            <NewInput
              {...register("text", { required: true })}
              autoFocus
              placeholder="Type new item.."
            />
            <NewInputButton>
              <NewCancelButton type="button" onClick={closeInput}>
                <CustomXMarkIcon />
              </NewCancelButton>
              <NewConfirmButton type="submit">
                <CustomCheckIcon />
              </NewConfirmButton>
            </NewInputButton>
          </NewText>
        )}
      </TitleContainer>
      <Items style={{ backgroundColor: isOver ? "rgba(0, 0, 0, 0.1)" : "" }}>
        {children}
      </Items>
    </Container>
  );
}

const Container = tw.div`
w-80
h-[28rem]
flex
flex-col
items-center
rounded-xl
py-3
px-1
bg-blue-100/80
dark:bg-sky-950/80
shadow-xl
transition-colors
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

const Title = tw.h2`
font-semibold
text-xl
w-full
text-center
text-slate-900
dark:text-slate-100
transition-colors
`;

const NewButton = tw.button`
absolute
right-3
font-light
text-xs
text-green-700/30
hover:text-green-700
dark:text-green-600/30
dark:hover:text-green-600
`;

const CustomPlusIcon = tw(PlusIcon)`
w-6
h-6
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
transition-colors
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
text-red-500
`;

const CustomXMarkIcon = tw(XMarkIcon)`
w-4
h-4
`;

const NewConfirmButton = tw.button`
text-green-500
`;

const CustomCheckIcon = tw(CheckIcon)`
w-4
h-4
`;

export default ToDoColumn;
