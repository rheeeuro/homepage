import tw from "tailwind-styled-components";
import ToDoColumn from "./ToDoColumn";
import ToDoItem from "./ToDoItem";
import { useEffect, useState } from "react";
import { refreshItems } from "../util/localstorage";

const TODO_COLUMN = ["To Do", "In Progress", "Done"];

export interface ItoDoItem {
  column: string;
  text: string;
}

export function ToDo() {
  const [toDoItems, setToDoItems] = useState<ItoDoItem[]>([]);

  useEffect(() => {
    const refreshToDoItems = refreshItems("todos", setToDoItems);
    refreshToDoItems();
    window.addEventListener("storage", refreshToDoItems);
    return () => {
      window.removeEventListener("storage", refreshToDoItems);
    };
  }, []);

  return (
    <Container>
      {TODO_COLUMN.map((title, index) => {
        return (
          <ToDoColumn key={index} title={title} setToDoItems={setToDoItems}>
            {toDoItems
              .filter((item) => item.column === title)
              .map((item, index) => (
                <ToDoItem
                  key={index}
                  text={item.text}
                  type={"todo"}
                  setToDoItems={setToDoItems}
                />
              ))}
          </ToDoColumn>
        );
      })}
    </Container>
  );
}

const Container = tw.div`
pt-8
w-full
hidden
md:flex
md:flex-col
lg:flex-row
md:justify-around
md:items-center
md:space-y-3
lg:space-x-0
mb-14
`;

export default ToDo;
