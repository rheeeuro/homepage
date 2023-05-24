import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import tw from "tailwind-styled-components";

interface BookmarkItemDropdownProps {
  modifyBookmark: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteBookmark: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function BookmarkItemDropdown({
  modifyBookmark,
  deleteBookmark,
}: BookmarkItemDropdownProps) {
  return (
    <Container>
      <Button onClick={modifyBookmark}>
        <PencilIcon className="w-3 h-3" />
        <h1>Modify</h1>
      </Button>
      <Button onClick={deleteBookmark}>
        <TrashIcon className="w-3 h-3" />
        <h1>Delete</h1>
      </Button>
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
flex
justify-center
items-center
space-x-2
text-md
text-slate-700
dark:text-slate-100
hover:bg-slate-700/30
`;

export default BookmarkItemDropdown;
