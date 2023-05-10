import tw from "tailwind-styled-components";
import ToDoColumn from "./ToDoColumn";
import ToDoItem from "./ToDoItem";
import { useState } from "react";

const Container = tw.div`
pt-8
w-full
h-5/6
flex
flex-row
justify-around
`;

const TODO_COLUMN = ["To Do", "In Progress", "Done"];

export interface ItoDoItem {
  column: string;
  text: string;
}

export function ToDo() {
  const [toDoItems, setToDoItems] = useState<ItoDoItem[]>([
    { column: "To Do", text: "동해물과" },
    { column: "In Progress", text: "백두산이" },
    { column: "Done", text: "마르고 닳도록" },
    { column: "Done", text: "하느님이 보우하사" },
    { column: "Done", text: "우리나라 만세" },
    { column: "To Do", text: "무궁화" },
    { column: "To Do", text: "삼천리" },
    { column: "To Do", text: "화려강산" },
    { column: "In Progress", text: "대한사람 대한으로" },
    { column: "To Do", text: "길이보전하세" },
  ]);

  return (
    <Container>
      {TODO_COLUMN.map((title, index) => {
        return (
          <ToDoColumn
            title={title}
            setToDoItems={setToDoItems}
            toDoItems={toDoItems}
          >
            {toDoItems
              .filter((item) => item.column === title)
              .map((item, index) => (
                <ToDoItem
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

export default ToDo;
