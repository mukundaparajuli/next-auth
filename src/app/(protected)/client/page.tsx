"use client";

import { currentUser } from "@/lib/auth";
import { auth } from "../../../../auth";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "../../../../hoooks/use-current-user";
const ClientPage = () => {
  const userInfo = useCurrentUser();

  return (
    <div>
      <UserInfo label="Client Component 📱" user={userInfo} />
    </div>
  );
};

export default ClientPage;
