import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Modal from "./Modal";
import { FieldErrors, useForm } from "react-hook-form";

export interface ThemeProps {
  bgUrl: string;
}

export function Theme() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ThemeProps>();
  const [dark, setDark] = useState<boolean>(false);
  const [bgUrl, setBgUrl] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storageBgUrl = localStorage.getItem("background-url");
    const storageDark = localStorage.getItem("dark");
    if (storageBgUrl) {
      setBgUrl(storageBgUrl);
    }
    if (storageDark) {
      setDark(storageDark === "true");
    }
  }, []);

  useEffect(() => {
    if (bgUrl.startsWith("https://")) {
      localStorage.setItem("background-url", bgUrl);
      document.body.style.backgroundImage = `url('${bgUrl}')`;
    }
  }, [bgUrl]);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const toggleDark = () => {
    setDark((prev) => {
      const newOne = !prev;
      localStorage.setItem("dark", newOne.toString());
      return newOne;
    });
  };

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  const onValid = (data: ThemeProps) => {
    setBgUrl(data.bgUrl);
    closeModal();
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <ThemeButtonContainer>
      <DarkmodeButton onClick={toggleDark}>
        {dark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        )}
      </DarkmodeButton>
      <ThemeButton
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </svg>
      </ThemeButton>
      <Modal
        title={"Change Theme"}
        open={modalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        onValid={onValid}
        onInValid={onInValid}
        registerProps={[
          {
            defaultValue: bgUrl,
            ...register("bgUrl", {
              required: "bgUrl is required",
              validate: {
                validUrl: (value) =>
                  value.startsWith("https://") ||
                  "bgUrl should begin with [ 'https://' ]",
                sameUrl: (value) => value !== bgUrl || "same bgUrl as before",
              },
            }),
          },
        ]}
        errors={errors}
      />
    </ThemeButtonContainer>
  );
}

const ThemeButtonContainer = tw.div`
w-52
hidden
md:flex
md:flex-row
md:justify-end
`;

const DarkmodeButton = tw.button`
mr-5
w-10
h-10
flex
justify-center
items-center
stroke-slate-900
dark:stroke-slate-100
hover:stroke-slate-700
dark:hover:stroke-slate-300
hover:bg-slate-900/10
rounded-full
`;

const ThemeButton = tw.button`
mr-8
w-10
h-10
flex
justify-center
items-center
stroke-slate-900
dark:stroke-slate-100
hover:stroke-slate-600
dark:hover:stroke-slate-400
hover:bg-slate-900/10
rounded-full
`;

export default Theme;
