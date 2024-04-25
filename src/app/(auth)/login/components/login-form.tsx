"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Client } from "@/interfaces/client";
import { Input } from "@/components/ui/input";
import { loginUserFormSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import TeamSwitcher from "@/components/team-switcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function LoginForm({ clients }: { clients: Client[] }) {
  /** Hooks */
  const router = useRouter();
  const form = useForm<z.infer<typeof loginUserFormSchema>>({
    resolver: zodResolver(loginUserFormSchema),
  });

  /** Methods */
  async function onSubmit(values: z.infer<typeof loginUserFormSchema>) {
    const { client, email, password } = values;
    const result = await signIn("credentials", {
      client,
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });

    result?.error && toast(JSON.stringify(result.error, null, 2), { icon: "💔" });
    result?.ok && router.push(`${result?.url}`);
  }

  /** Render */
  return (
    <Card className="lg:w-[60%]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>join with your team</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <FormControl>
                    <TeamSwitcher field={field} clients={clients} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>

            <Separator />

            <Button variant="link">Forgot password?</Button>
            <Button variant="link" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
