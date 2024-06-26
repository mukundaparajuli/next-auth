import { Button } from "@/components/ui/button";
import { auth, signOut } from "../../../../auth";

export default async function Page() {
  const session = await auth();
  console.log("Redirected to settings page");
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
}
