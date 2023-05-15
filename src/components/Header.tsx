import tw from "tailwind-styled-components";
import Clock from "./Clock";
import Search from "./Search";
import Theme from "./Theme";

export function Header() {
  return (
    <Container>
      <Clock />
      <Search />
      <Theme />
    </Container>
  );
}

const Container = tw.div`
w-full
h-12
flex
flex-row
justify-center
md:justify-between
items-center
bg-slate-50/20
`;

export default Header;
