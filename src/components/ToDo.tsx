import tw from "tailwind-styled-components";
import ToDoColumn from "./ToDoColumn";
import ToDoItem from "./ToDoItem";

const Container = tw.div`
pt-8
w-full
h-5/6
flex
flex-row
justify-around
`;

export function ToDo() {
  return (
    <Container>
      <ToDoColumn title={"To Do"}>
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
      </ToDoColumn>
      <ToDoColumn title={"In Progress"}>
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
      </ToDoColumn>
      <ToDoColumn title={"Done"}>
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
