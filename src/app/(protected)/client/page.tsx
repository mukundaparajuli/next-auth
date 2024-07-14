"use client";

import { auth } from "../../../../auth";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "../../../../hoooks/use-current-user";
const ClientPage = () => {
  const user = useCurrentUser();
  {
    console.log("Client side User: ", user);
  }

  return (
    <div>
      <UserInfo label="Client Component 📱" user={user} />
    </div>
  );
};

export default ClientPage;
