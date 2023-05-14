import tw from "tailwind-styled-components";
import { IBookmarkItem } from "./Bookmark";

interface BookmarkItemProps {
  title: string;
  url: string;
  setBookmarkItems: React.Dispatch<React.SetStateAction<IBookmarkItem[]>>;
}

export function BookmarkItem({
  title,
  url,
  setBookmarkItems,
}: BookmarkItemProps) {
  const linkToBookmark = () => {
    window.location.href = url;
  };

  const deleteBookmark = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const confirm = window.confirm(
      `Are you sure you want to delete [${title}]?`
    );
    if (!confirm) return;

    setBookmarkItems((prev) => {
      const newOne = prev.filter(
        (item) => item.title !== title && item.url !== url
      );
      localStorage.setItem("bookmarks", JSON.stringify(newOne));
      return newOne;
    });
  };

  const getFaviconUrl = () => {
    const [, hostname] = url.split("https://");
    const lastIndex = hostname.lastIndexOf("/");
    let rootUrl = hostname;
    if (lastIndex !== -1) {
      rootUrl = hostname.slice(0, hostname.lastIndexOf("/"));
    }

    return `https://${rootUrl}/favicon.ico`;
  };

  return (
    <Container onClick={linkToBookmark}>
      <FaviconImage style={{ backgroundImage: `url(${getFaviconUrl()})` }} />
      <DeleteButton onClick={deleteBookmark}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
          />
        </svg>
      </DeleteButton>
      <Title>{title}</Title>
    </Container>
  );
}

export const Container = tw.div`
w-24
h-24
m-5
flex
flex-col
justify-center
items-center
rounded-xl
cursor-pointer
relative
group
bg-slate-300/70
`;

const FaviconImage = tw.div`
w-8
h-8
mb-2
bg-cover
bg-no-repeat
bg-center
`;

const Title = tw.h1`
`;

const DeleteButton = tw.button`
absolute
justify-center
items-center
w-4
h-4
top-2
right-2
hidden
group-hover:flex
stroke-slate-700/70
hover:stroke-red-700/70
`;

export default BookmarkItem;
