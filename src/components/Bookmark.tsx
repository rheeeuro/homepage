import tw from "tailwind-styled-components";
import BookmarkItem from "./BookmarkItem";
import { useEffect, useState } from "react";
import { Container as PlusContainer } from "./BookmarkItem";

const Container = tw.div`
w-full
p-5
h-1/6
flex
flex-row
justify-center
items-center
`;

export interface IBookmarkItem {
  title: string;
  url: string;
}

export function Bookmark() {
  const [bookmarkItems, setBookmarkItems] = useState<IBookmarkItem[]>([]);

  useEffect(() => {
    function refreshBookmarkItems() {
      const bookmarkJson = localStorage.getItem("bookmarks");
      if (bookmarkJson) {
        setBookmarkItems(JSON.parse(bookmarkJson));
      }
    }
    refreshBookmarkItems();
    window.addEventListener("storage", refreshBookmarkItems);
    return () => {
      window.removeEventListener("storage", refreshBookmarkItems);
    };
  }, []);

  return (
    <Container>
      {bookmarkItems.map((item, index) => (
        <BookmarkItem key={index} title={item.title} url={item.url} />
      ))}
      <PlusContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 p-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <h1>Add</h1>
      </PlusContainer>
    </Container>
  );
}

export default Bookmark;
