"use client";
import { CardWrapper } from "@/components/ui/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BeatLoader } from "react-spinners";

export default function NewVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    console.log(token);
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Verifiying your account"
      backButtonLabel="Back to Login Page"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <BeatLoader />
      </div>
    </CardWrapper>
  );
}
