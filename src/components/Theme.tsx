import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Modal from "./Modal";
import { FieldErrors, useForm } from "react-hook-form";
import { SunIcon, MoonIcon, PaintBrushIcon } from "@heroicons/react/24/outline";

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
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6" />
        )}
      </DarkmodeButton>
      <ThemeButton
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <PaintBrushIcon className="w-6 h-6" />
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
text-slate-900
dark:text-slate-100
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
text-slate-900
dark:text-slate-100
hover:bg-slate-900/10
rounded-full
`;

export default Theme;
