"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPassword } from "../../../../schemas";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../input";
import { CardWrapper } from "./card-wrapper";
import { Button } from "../button";
import { z } from "zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Login } from "../../../../actions/login";
import Link from "next/link";
import { Reset } from "../../../../actions/reset";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "../../../../actions/new-password";

const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof newPassword>>({
    resolver: zodResolver(newPassword),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newPassword>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Enter your new password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
