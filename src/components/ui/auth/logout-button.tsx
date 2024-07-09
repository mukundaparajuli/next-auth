"use client";
import { useRouter } from "next/navigation";

interface LogOutProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const LogOutButton = ({ children, asChild }: LogOutProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
