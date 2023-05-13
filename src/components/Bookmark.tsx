import tw from "tailwind-styled-components";
import BookmarkItem from "./BookmarkItem";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { Container as PlusContainer } from "./BookmarkItem";
import { FieldErrors, useForm } from "react-hook-form";

const Container = tw.div`
w-full
p-5
h-1/6
flex
flex-row
justify-center
items-center
`;

const ModalContainer = tw(ReactModal)`
absolute
top-1/2
left-1/2
-translate-x-1/2
-translate-y-1/2
w-96
h-48
m-auto
outline-none
rounded-xl
shadow-xl
bg-slate-300
`;

const ModalForm = tw.form`
w-full
h-full
`;

const ModalTitle = tw.div`
w-full
h-12
flex
justify-center
items-center
bg-slate-400
rounded-tl-xl
rounded-tr-xl
text-lg
font-medium
`;

const ModalContent = tw.div`
w-full
h-24
flex
flex-col
p-2
border-y-2
border-gray-800/5
`;

const ModalInputRow = tw.div`
w-full
h-10
flex
flex-row
items-center
justify-between
text-base
font-medium
p-4
`;

const ModalInput = tw.input`
shadow-md
rounded-sm
w-72
`;

const ModalCancelButton = tw.button`
absolute
top-2
right-2
w-8
h-8
`;

const ModalButtonRow = tw.div`
w-full
h-12
bg-slate-400/30
rounded-br-xl
rounded-bl-xl
flex
flex-row
justify-between
items-center
px-5
text-red-700
`;

const ModalCreateButton = tw.button`
w-20
h-8
rounded-md
shadow-md
text-center
font-normal
text-sm
bg-green-400/10
text-gray-800
`;

export interface IBookmarkItem {
  title: string;
  url: string;
}

interface NewBookmarkProps {
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
          bookmarkItems={bookmarkItems}
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
      <ModalContainer
        isOpen={modalOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <ModalCancelButton onClick={closeModal}>X</ModalCancelButton>
        <ModalForm
          onSubmit={handleSubmit(onValid, onInValid)}
          autoComplete="off"
        >
          <ModalTitle>New Bookmark</ModalTitle>
          <ModalContent>
            <ModalInputRow>
              <h1>Title</h1>
              <ModalInput
                {...register("title", { required: true })}
                autoFocus
              />
            </ModalInputRow>
            <ModalInputRow>
              <h1>URL</h1>
              <ModalInput
                {...register("url", {
                  required: "URL is required",
                  validate: {
                    validUrl: (value) =>
                      value.startsWith("https://") || "URL is not valid",
                  },
                })}
              />
            </ModalInputRow>
          </ModalContent>
          <ModalButtonRow>
            <div>{errors.url?.message}</div>
            <ModalCreateButton type="submit">CREATE</ModalCreateButton>
          </ModalButtonRow>
        </ModalForm>
      </ModalContainer>
    </Container>
  );
}

export default Bookmark;
