import tw from "tailwind-styled-components";

const Container = tw.div`
absolute
bottom-2
right-4
text-xs
font-normal
text-gray-300
`;

export function Footer() {
  return <Container>&copy; Copyright rheeeuro</Container>;
}

export default Footer;
