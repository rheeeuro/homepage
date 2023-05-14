import tw from "tailwind-styled-components";
import ToDoColumn from "./ToDoColumn";
import ToDoItem from "./ToDoItem";
import { useEffect, useState } from "react";

const TODO_COLUMN = ["To Do", "In Progress", "Done"];

export interface ItoDoItem {
  column: string;
  text: string;
}

export function ToDo() {
  const [toDoItems, setToDoItems] = useState<ItoDoItem[]>([]);

  useEffect(() => {
    function checkData() {
      const todosJson = localStorage.getItem("todos");
      if (todosJson) {
        setToDoItems(JSON.parse(todosJson));
      }
    }
    checkData();
    window.addEventListener("storage", checkData);
    return () => {
      window.removeEventListener("storage", checkData);
    };
  }, []);

  return (
    <Container>
      {TODO_COLUMN.map((title, index) => {
        return (
          <ToDoColumn
            key={index}
            title={title}
            setToDoItems={setToDoItems}
            toDoItems={toDoItems}
          >
            {toDoItems
              .filter((item) => item.column === title)
              .map((item, index) => (
                <ToDoItem
                  key={index}
                  text={item.text}
                  type={"todo"}
                  setToDoItems={setToDoItems}
                  toDoItems={toDoItems}
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
mb-24
`;

export default ToDo;
