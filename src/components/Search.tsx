import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
interface SearchProps {
  search: string;
}

export function Search() {
  const { register, handleSubmit } = useForm<SearchProps>();

  const onValid = (data: SearchProps) => {
    window.location.href = `http://www.google.co.kr/search?q=${data.search}`;
  };

  return (
    <SearchContainer onSubmit={handleSubmit(onValid)} autoComplete="off">
      <SearchInput
        {...register("search", { required: true })}
        placeholder="Google search.."
      />
      <SearchButton type="submit">
        <CustomMagnifyingGlassIcon />
      </SearchButton>
    </SearchContainer>
  );
}

const SearchContainer = tw.form`
w-96
relative
flex
flex-row
items-center
`;

const SearchInput = tw.input`
absoulte
w-full
h-8
pl-4
pr-8
shadow-md
rounded-3xl
bg-white-200
`;

const SearchButton = tw.button`
absolute
right-2
`;

const CustomMagnifyingGlassIcon = tw(MagnifyingGlassIcon)`
w-4
h-4
`;

export default Search;
