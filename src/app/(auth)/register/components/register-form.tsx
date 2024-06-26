"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TeamSwitcher from "@/components/team-switcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Client } from "@/interfaces/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const registerUserFormSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4),
  client: z.string(),
  password: z.string().min(8).max(50),
  password_confirmation: z.string().min(8).max(50),
});

function RegisterForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerUserFormSchema>>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues: {
      client: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerUserFormSchema>) {
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    toast(JSON.stringify(await res.json(), null, 2));

    if (!res.ok) return;

    return router.push("/login");
  }

  return (
    <Card className="lg:w-[60%]">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>join our team</CardDescription>
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
                    <Input placeholder="shadcn@mai.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm your password</FormLabel>
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
              <Link href="/login">Login</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
