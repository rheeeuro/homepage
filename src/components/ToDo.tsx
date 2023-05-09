import tw from "tailwind-styled-components";
import ToDoColumn from "./ToDoColumn";
import ToDoItem from "./ToDoItem";

const Container = tw.div`
w-full
h-[7/10]
flex
flex-row
justify-around
bg-cyan-800
`;

export function ToDo() {
  return (
    <Container>
      <ToDoColumn>
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
      </ToDoColumn>
      <ToDoColumn>
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
      </ToDoColumn>
      <ToDoColumn>
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
      </ToDoColumn>
    </Container>
  );
}

export default ToDo;
