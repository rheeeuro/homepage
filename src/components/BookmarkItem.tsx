import tw from "tailwind-styled-components";

const Container = tw.div`
w-28
h-28
m-5
flex
flex-row
justify-center
items-center
rounded-full
relative
bg-green-300
`;

const Title = tw.h1`
absolute
`;

export function BookmarkItem() {
  return (
    <Container>
      <Title>123</Title>
    </Container>
  );
}

export default BookmarkItem;
