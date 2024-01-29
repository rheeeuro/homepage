import tw from "tailwind-styled-components";
import ToDoColumn from "./ToDoColumn";
import ToDoItem from "./ToDoItem";
import { useEffect, useState } from "react";
import { refreshItems } from "../util/localstorage";
import { motion } from "framer-motion";

const TODO_COLUMN = ["To Do", "In Progress", "Done"];

export interface ItoDoItem {
  column: string;
  text: string;
}

export function ToDo() {
  const [toDoItems, setToDoItems] = useState<ItoDoItem[]>([]);
  const [showTodo, setShowTodo] = useState<boolean>(false);

  useEffect(() => {
    const refreshShowTodo = refreshItems("showTodo", setShowTodo);
    refreshShowTodo();
    window.addEventListener("storage", refreshShowTodo);
    return () => {
      window.removeEventListener("storage", refreshShowTodo);
    };
  }, []);

  useEffect(() => {
    const refreshToDoItems = refreshItems("todos", setToDoItems);
    refreshToDoItems();
    window.addEventListener("storage", refreshToDoItems);
    return () => {
      window.removeEventListener("storage", refreshToDoItems);
    };
  }, []);

  return (
    <>
      {showTodo ? (
        <Container variants={containerVariants} initial="from" animate="to">
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
      ) : (
        <Blank />
      )}
    </>
  );
}

const Blank = tw.div`
w-full
h-[35rem]
`;

const Container = tw(motion.div)`
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

const containerVariants = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};

export default ToDo;
