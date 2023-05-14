import tw from "tailwind-styled-components";
import BookmarkItem from "./BookmarkItem";
import { useEffect, useState } from "react";
import { Container as PlusContainer } from "./BookmarkItem";
import { FieldErrors, useForm } from "react-hook-form";
import Modal from "./Modal";

export interface IBookmarkItem {
  title: string;
  url: string;
}

export interface NewBookmarkProps {
  title: string;
  url: string;
}

const BOOKMARK_MAXNUM = 8;

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

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  const onValid = (data: NewBookmarkProps) => {
    setBookmarkItems((prev) => {
      const newOne = [...prev, { title: data.title, url: data.url }];
      localStorage.setItem("bookmarks", JSON.stringify(newOne));
      return newOne;
    });
    closeModal();
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Container>
      {bookmarkItems.map((item, index) => (
        <BookmarkItem
          key={index}
          title={item.title}
          url={item.url}
          setBookmarkItems={setBookmarkItems}
        />
      ))}
      {bookmarkItems.length < BOOKMARK_MAXNUM && (
        <PlusContainer
          onClick={() => {
            setModalOpen(true);
          }}
        >
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
      )}
      <Modal
        title={"New Bookmark"}
        open={modalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        onValid={onValid}
        onInValid={onInValid}
        registerProps={[
          { ...register("title", { required: true }) },
          {
            ...register("url", {
              required: true,
              validate: {
                validUrl: (value) =>
                  value.startsWith("https://") || "URL is not valid",
              },
            }),
          },
        ]}
        errors={errors}
      />
    </Container>
  );
}

const Container = tw.div`
w-full
p-5
h-1/6
flex
flex-row
flex-wrap
justify-center
items-center
`;

export default Bookmark;
