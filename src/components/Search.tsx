import { useState } from "react";
import tw from "tailwind-styled-components";

const SearchContainer = tw.form`
w-1/5
relative
flex
flex-row
items-center
`;

const SearchInput = tw.input`
absoulte
w-full
h-8
pl-3
pr-8
shadow-md
rounded-md
bg-yellow-200

`;

const SearchButton = tw.button`
absolute
right-2
`;

export function Search() {
  const [search, setSearch] = useState<string>("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const confirmSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === "") return;
    window.location.href = `http://www.google.co.kr/search?q=${search}`;
  };

  return (
    <SearchContainer action="" autoComplete="off" onSubmit={confirmSearch}>
      <SearchInput
        type="text"
        value={search}
        onChange={onChangeSearch}
        placeholder="Google search.."
      />
      <SearchButton type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </SearchButton>
    </SearchContainer>
  );
}

export default Search;
