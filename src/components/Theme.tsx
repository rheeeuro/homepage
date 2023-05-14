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

  useEffect(() => {
    function refreshBgUrl() {
      const newBgUrl = localStorage.getItem("bgUrl");
      if (newBgUrl) {
        setBgUrl(newBgUrl);
      }
    }
    refreshBgUrl();
    window.addEventListener("storage", refreshBgUrl);
    return () => {
      window.removeEventListener("storage", refreshBgUrl);
    };
  }, []);

  return (
    <ThemeButtonContainer>
      <ThemeButton
        onClick={() => {
          setModalOpen(true);
        }}
      >
        THEME
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
              required: true,
              validate: {
                validUrl: (value) =>
                  value.startsWith("https://") || "bgUrl is not valid",
                sameUrl: (value) => value !== bgUrl || "same bgUrl",
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
w-1/5
flex
flex-row
justify-end
`;

const ThemeButton = tw.button`
mr-8
`;

export default Theme;
