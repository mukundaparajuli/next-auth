import Link from "next/link";
import { Button } from "../button";

interface backButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: backButtonProps) => {
  return (
    <Button variant={"link"} className="font-normal w-full" size={"sm"}>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
