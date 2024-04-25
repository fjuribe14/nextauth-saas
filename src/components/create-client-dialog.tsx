import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useRouter } from "next/navigation";

const registerClientFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(225),
});

export default function CreateClientDialog({
  children,
  showNewTeamDialog,
  setShowNewTeamDialog,
}: any) {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerClientFormSchema>>({
    resolver: zodResolver(registerClientFormSchema),
  });

  async function onSubmit(values: z.infer<typeof registerClientFormSchema>) {
    const res = await fetch(`/api/client`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    toast(JSON.stringify(await res.json(), null, 2));

    if (!res.ok) return;

    router.refresh();
    setShowNewTeamDialog(false);
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>Add a new team to manage products and customers.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name of your team" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description of your team" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="outline"
              onClick={() => {
                setShowNewTeamDialog(false);
              }}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
