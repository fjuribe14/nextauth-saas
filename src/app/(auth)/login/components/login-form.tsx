"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import TeamSwitcher from "@/components/team-switcher";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { z } from "zod";
import { Client } from "@/interfaces/client";
import { toast } from "sonner";

const loginUserFormSchema = z.object({
  client: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export default function LoginForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginUserFormSchema>>({
    resolver: zodResolver(loginUserFormSchema),
    defaultValues: {
      client: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginUserFormSchema>) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        return toast("Something went wrong!");
      }

      return router.push("/");
    } catch (error) {
      return toast("Something went wrong!");
    }
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
