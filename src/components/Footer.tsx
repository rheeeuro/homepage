import tw from "tailwind-styled-components";

export function Footer() {
  return <Container>&copy; Copyright rheeeuro</Container>;
}

const Container = tw.div`
absolute
bottom-2
right-4
text-xs
font-normal
text-gray-300/30
`;

export default Footer;
