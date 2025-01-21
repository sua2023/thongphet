"use client";
import { useRouter } from "next/navigation";
import { EyeFillIcon } from "./icons/icons";

type ButtonProps = {
  onClick?: () => void;
};
export function ViewButtonIcon({ onClick }: ButtonProps) {
  const router = useRouter();
  return (
    <button onClick={onClick} className="text-stone400 lg:border hover:border-stone400/50 border-grayDark hover:bg-stone400/70 hover:text-white focus:ring-2 focus:outline-none focus:ring-stone400 font-medium rounded-full text-sm p-1.5 text-center items-center">
      <EyeFillIcon size={18} />
    </button>
  );
}
