"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LogOutProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const LogOutButton = ({ children, asChild }: LogOutProps) => {
  const router = useRouter();
  const onClick = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
