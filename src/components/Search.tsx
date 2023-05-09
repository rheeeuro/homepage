import tw from "tailwind-styled-components";

const SearchContainer = tw.div`
w-1/5
`;

const SearchInput = tw.input`
w-full
h-8
bg-yellow-200
`;

export function Search() {
  return (
    <SearchContainer>
      <SearchInput />
    </SearchContainer>
  );
}

export default Search;
