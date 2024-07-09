import { currentUser } from "@/lib/auth";
import { auth } from "../../../../auth";
import { UserInfo } from "@/components/user-info";
const ServerPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <UserInfo label="Server Component 💻" user={user} />
    </div>
  );
};

export default ServerPage;
