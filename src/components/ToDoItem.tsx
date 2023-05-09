import { useState } from "react";
import tw from "tailwind-styled-components";

const Container = tw.div`
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
`;

const ToDoText = tw.p`
font-medium
text-lg
w-11/12
overflow-clip
overflow-ellipsis
`;

const DeleteButton = tw.button`
text-xs
`;

export function ToDoItem() {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Container
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <ToDoText>dfsdfszdfdfsfssdfsfsdfsfdsfasdasdasdadasdadsdfs</ToDoText>
      <DeleteButton style={hover ? { display: "block" } : { display: "none" }}>
        ❌
      </DeleteButton>
    </Container>
  );
}

export default ToDoItem;
