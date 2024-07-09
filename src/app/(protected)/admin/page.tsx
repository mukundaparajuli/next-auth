"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "../../../../hoooks/use-current-role";
import { RoleGate } from "@/components/ui/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const role = useCurrentRole();
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row justify-between items-center rounded-lg p-3 border shadow-sm">
          <p className="text-sm font-medium">Admin only API route</p>
          <Button>Click to test</Button>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg p-3 border shadow-sm">
          <p className="text-sm font-medium">Admin only server action</p>
          <Button>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
