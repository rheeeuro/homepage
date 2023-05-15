import tw from "tailwind-styled-components";
import { IBookmarkItem } from "./Bookmark";
import { useRef } from "react";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { Identifier } from "typescript";

interface BookmarkItemProps {
  index: number;
  title: string;
  url: string;
  setBookmarkItems: React.Dispatch<React.SetStateAction<IBookmarkItem[]>>;
  moveBookmark: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  title: string;
  type: string;
}

export function BookmarkItem({
  index,
  title,
  url,
  setBookmarkItems,
  moveBookmark,
}: BookmarkItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "bookmarks",
    collect(monitor: any) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveBookmark(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "bookmarks",
    item: () => {
      return { title, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

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

    return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${rootUrl}&size=32`;
    // return `https://${rootUrl}/favicon.ico`;
  };

  return (
    <Container
      onClick={linkToBookmark}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <FaviconContainer>
        <FaviconImage style={{ backgroundImage: `url(${getFaviconUrl()})` }} />
      </FaviconContainer>
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
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
    </Container>
  );
}

export const Container = tw.div`
w-24
h-24
m-5
p-2
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

const FaviconContainer = tw.div`
w-full
h-12
mb-1
flex
justify-center
items-center
`;

const FaviconImage = tw.div`
w-8
h-8
bg-cover
bg-no-repeat
bg-center
`;

const TitleContainer = tw.div`
w-full
flex
justify-center
items-center
`;

const Title = tw.h1`
w-full
font-normal
text-sm
text-center
text-[#383c40]
overflow-clip
overflow-ellipsis
break-words
line-clamp-2
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
