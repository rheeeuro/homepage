import tw from "tailwind-styled-components";

const Container = tw.div`
w-12
h-12
m-5
flex
flex-row
justify-center
items-center
rounded-full
bg-green-300
`;

export function BookmarkItem() {
  return <Container>123</Container>;
}

export default BookmarkItem;
