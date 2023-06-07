import tw from "tailwind-styled-components";
import { IBookmarkItem } from "./Bookmark";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Identifier } from "typescript";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import BookmarkItemDropdown from "./BookmarkItemDropdown";

interface BookmarkItemProps {
  index: number;
  setBookmarkItems: React.Dispatch<React.SetStateAction<IBookmarkItem[]>>;
  moveBookmark: (dragIndex: number, hoverIndex: number) => void;
  setSelected: React.Dispatch<React.SetStateAction<IBookmarkItem | null>>;
  selected: IBookmarkItem | null;
  bookmark: IBookmarkItem;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DragItem {
  index: number;
  title: string;
  type: string;
}

export function BookmarkItem({
  index,
  setBookmarkItems,
  moveBookmark,
  setSelected,
  selected,
  bookmark,
  setModalOpen,
}: BookmarkItemProps) {
  const [open, setOpen] = useState<boolean>(false);
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
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveBookmark(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "bookmarks",
    item: () => {
      return { index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      setOpen(false);
    }
  }, [isDragging]);

  drag(drop(ref));

  const linkToBookmark = () => {
    window.location.href = bookmark.url;
  };

  const modifyBookmark = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setSelected(bookmark);
    setModalOpen(true);
  };

  const deleteBookmark = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const confirm = window.confirm(
      `Are you sure you want to delete [${bookmark.title}]?`
    );
    if (!confirm) return;

    setBookmarkItems((prev) => {
      const newOne = prev.filter((item) => item !== bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(newOne));
      return newOne;
    });
  };

  const getFaviconUrl = () => {
    const [, hostname] = bookmark.url.split("https://");
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
      <MenuButton
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <EllipsisVerticalIcon className="w-4 h-4" />
        {open && (
          <BookmarkItemDropdown
            modifyBookmark={modifyBookmark}
            deleteBookmark={deleteBookmark}
          />
        )}
      </MenuButton>
      <TitleContainer>
        <Title>{bookmark.title}</Title>
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
hover:bg-slate-300/90
transition-all
dark:bg-slate-800/70
dark:hover:bg-slate-800/90
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
dark:text-slate-100
overflow-clip
overflow-ellipsis
break-words
line-clamp-2
transition-colors
`;

const MenuButton = tw.div`
absolute
justify-center
items-center
w-6
h-6
rounded-full
top-1
right-1
hidden
group-hover:flex
text-slate-700/70
hover:text-slate-900/70
dark:text-slate-400/70
dark:hover:text-slate-100/70
hover:bg-slate-400/30
dark:hover:bg-slate-900/30
`;

export default BookmarkItem;
