import tw from "tailwind-styled-components";
import BookmarkItem from "./BookmarkItem";

const Container = tw.div`
w-full
p-5
h-1/6
flex
flex-row
justify-center
items-center
`;

export function Bookmark() {
  return (
    <Container>
      <BookmarkItem />
      <BookmarkItem />
      <BookmarkItem />
      <BookmarkItem />
      <BookmarkItem />
      <BookmarkItem />
    </Container>
  );
}

export default Bookmark;
