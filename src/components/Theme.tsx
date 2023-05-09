import tw from "tailwind-styled-components";

const ThemeButtonContainer = tw.div`
w-1/5
flex
flex-row
justify-end
`;

const ThemeButton = tw.button`
mr-8
`;

export function Theme() {
  return (
    <ThemeButtonContainer>
      <ThemeButton>THEME</ThemeButton>
    </ThemeButtonContainer>
  );
}

export default Theme;
