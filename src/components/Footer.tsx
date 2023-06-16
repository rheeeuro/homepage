import tw from "tailwind-styled-components";

export function Footer() {
  return (
    <Container>
      {"Copyright"} &copy; {`${new Date().getFullYear()} rheeeuro`}
    </Container>
  );
}

const Container = tw.div`
fixed
bottom-2
right-4
text-xs
font-normal
text-gray-300/30
`;

export default Footer;
