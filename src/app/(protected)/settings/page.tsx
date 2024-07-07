"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "../../../../hoooks/use-current-user";
export default function Page() {
  const user = useCurrentUser();
  console.log("USer=", user);
  const onClick = () => {
    signOut();
  };
  return (
    <div>
      <form>
        <Button onClick={onClick}>Sign Out</Button>
      </form>
    </div>
  );
}
