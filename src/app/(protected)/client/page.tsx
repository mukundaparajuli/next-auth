"use client";

import { currentUser } from "@/lib/auth";
import { auth } from "../../../../auth";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "../../../../hoooks/use-current-user";
const ClientPage = () => {
  const userInformation = useCurrentUser();

  return (
    <div>
      <UserInfo label="Client Component 📱" user={userInformation} />
    </div>
  );
};

export default ClientPage;
