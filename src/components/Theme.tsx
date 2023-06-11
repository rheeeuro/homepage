import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Modal from "./Modal";
import { FieldErrors, useForm } from "react-hook-form";
import { SunIcon, MoonIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

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
    if (storageBgUrl) setBgUrl(storageBgUrl);
    if (storageDark) setDark(storageDark === "true");
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
      <AnimatePresence mode="wait">
        <DarkmodeButton
          onClick={toggleDark}
          key={dark ? "dark" : "light"}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {dark ? <SunButton /> : <MoonButton />}
        </DarkmodeButton>
      </AnimatePresence>
      <ThemeButton
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <CustomPaintBrushIcon />
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

const DarkmodeButton = tw(motion.button)`
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
group
`;

const SunButton = tw(SunIcon)`
w-6
h-6
text-orange-300
group-hover:text-orange-200
`;

const MoonButton = tw(MoonIcon)`
w-6
h-6
text-purple-800
group-hover:text-purple-000
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

const CustomPaintBrushIcon = tw(PaintBrushIcon)`
w-6
h-6
`;

export default Theme;
