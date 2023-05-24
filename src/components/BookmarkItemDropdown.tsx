import tw from "tailwind-styled-components";

interface BookmarkItemDropdownProps {
  modifyBookmark: () => void;
  deleteBookmark: () => void;
}

export function BookmarkItemDropdown({
  modifyBookmark,
  deleteBookmark,
}: BookmarkItemDropdownProps) {
  return (
    <Container>
      <Button>Modify</Button>
      <Button>Delete</Button>
    </Container>
  );
}

const Container = tw.div`
absolute
flex
flex-col
justify-around
items-center
z-10
w-24
h-16
top-3
left-3
text-xs
font-normal
bg-slate-200
dark:bg-slate-500
rounded-md
`;

const Button = tw.button`
w-full
h-1/2
text-md
text-slate-700
dark:text-slate-100
hover:bg-slate-700/30
`;

export default BookmarkItemDropdown;
