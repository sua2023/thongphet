import { DeleteIcon } from "./icons/icons";

type ButtonProps = {
  onClick?: () => void;
};
export function DeleteButtonIcon({ onClick }: ButtonProps) {
  return (
    <button
      className="text-red hover:border-red/50  hover:bg-red/70 hover:text-white focus:ring-2 focus:outline-none focus:ring-red font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
      onClick={onClick}
    >
      <DeleteIcon size={18} />
    </button>
  );
}
