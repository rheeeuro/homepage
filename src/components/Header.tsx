import tw from "tailwind-styled-components";
import Clock from "./Clock";
import Search from "./Search";
import Theme from "./Theme";

const Container = tw.div`
w-full
h-12
flex
flex-row
justify-between
items-center
bg-slate-50/50
`;

export function Header() {
  return (
    <Container>
      <Clock />
      <Search />
      <Theme />
    </Container>
  );
}

export default Header;
