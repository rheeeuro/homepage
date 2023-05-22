import tw from "tailwind-styled-components";
import update from "immutability-helper";
import BookmarkItem from "./BookmarkItem";
import { useCallback, useEffect, useState } from "react";
import { Container as BookmarkContainer } from "./BookmarkItem";
import { FieldErrors, useForm } from "react-hook-form";
import Modal from "./Modal";
import { refreshItems } from "../util/localstorage";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export interface IBookmarkItem {
  title: string;
  url: string;
}

export interface NewBookmarkProps {
  title: string;
  url: string;
}

const BOOKMARK_MAXNUM = 16;

export function Bookmark() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewBookmarkProps>();
  const [bookmarkItems, setBookmarkItems] = useState<IBookmarkItem[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const refreshBookmarkItems = refreshItems("bookmarks", setBookmarkItems);
    refreshBookmarkItems();
    window.addEventListener("storage", refreshBookmarkItems);
    return () => {
      window.removeEventListener("storage", refreshBookmarkItems);
    };
  }, []);

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  const onValid = (data: NewBookmarkProps) => {
    setBookmarkItems((prev) => {
      const newOne = [
        ...prev,
        { title: data.title, url: data.url, index: bookmarkItems.length + 1 },
      ];
      localStorage.setItem("bookmarks", JSON.stringify(newOne));
      return newOne;
    });
    closeModal();
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const moveBookmark = useCallback((dragIndex: number, hoverIndex: number) => {
    setBookmarkItems((prevBookmarks: IBookmarkItem[]) => {
      const newOne = update(prevBookmarks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevBookmarks[dragIndex] as IBookmarkItem],
        ],
      });
      localStorage.setItem("bookmarks", JSON.stringify(newOne));
      return newOne;
    });
  }, []);

  const renderBookmark = useCallback(
    (bookmark: IBookmarkItem, index: number) => {
      return (
        <BookmarkItem
          key={bookmark.title}
          index={index}
          title={bookmark.title}
          url={bookmark.url}
          setBookmarkItems={setBookmarkItems}
          moveBookmark={moveBookmark}
        />
      );
    },
    []
  );

  return (
    <Container variants={containerVariants} initial="from" animate="to">
      {bookmarkItems.map((item, index) => renderBookmark(item, index))}
      {bookmarkItems.length < BOOKMARK_MAXNUM && (
        <PlusContainer
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <PlusIcon className="w-10 h-10 p-2" />
          <h1>Add</h1>
        </PlusContainer>
      )}
      <Modal
        title={"New Bookmark"}
        open={modalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        onValid={onValid}
        onInValid={onInValid}
        registerProps={[
          { ...register("title", { required: "Title is required" }) },
          {
            ...register("url", {
              required: "URL is required",
              validate: {
                validUrl: (value) =>
                  value.startsWith("https://") ||
                  "URL should begin with [ 'https://' ]",
              },
            }),
          },
        ]}
        errors={errors}
      />
    </Container>
  );
}

const Container = tw(motion.div)`
w-full
px-10
py-5
h-1/6
flex
flex-row
flex-wrap
justify-center
items-center
`;

const PlusContainer = tw(BookmarkContainer)`
hover:text-green-700
text-slate-900
dark:text-slate-100
dark:hover:text-green-500
transition-colors
`;

const containerVariants = {
  from: { opacity: 0 },
  to: { opacity: 1, transition: { delay: 0.1 } },
};

export default Bookmark;
