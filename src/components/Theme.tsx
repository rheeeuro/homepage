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
  const [bgUrl, setBgUrl] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storageBgUrl = localStorage.getItem("bgUrl");
    if (storageBgUrl) {
      setBgUrl(storageBgUrl);
    }
  }, []);

  useEffect(() => {
    if (bgUrl.startsWith("https://")) {
      localStorage.setItem("bgUrl", bgUrl);
      document.body.style.backgroundImage = `url('${bgUrl}')`;
    }
  }, [bgUrl]);

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

const ThemeButton = tw.button`
mr-8
stroke-slate-600
hover:stroke-slate-900
`;

export default Theme;
