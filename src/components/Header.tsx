import tw from "tailwind-styled-components";
import Clock from "./Clock";
import Search from "./Search";

const Container = tw.div`
w-full
h-12
flex
flex-row
justify-between
bg-red-400
`;

export function Header() {
  return (
    <Container>
      <Clock />
      <Search />
      <div className="theme">
        <button>Change Theme</button>
      </div>
    </Container>
  );
}

export default Header;
