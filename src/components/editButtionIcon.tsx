import { EditIcon } from "./icons/icons";

type ButtonProps = {
  onClick?: () => void;
};
export function EditButtonIcon({ onClick }: ButtonProps) {
  return (
    <button
      className="text-primary hover:border-primary/50 hover:bg-primary/70 hover:text-white focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
      onClick={onClick}
    >
      <EditIcon size={18} />
    </button>
  );
}
