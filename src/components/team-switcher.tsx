"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Client } from "@/interfaces/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import CreateClientDialog from "./create-client-dialog";

export default function TeamSwitcher({
  className,
  field,
  clients,
}: {
  className?: string;
  field: any;
  clients: Client[];
}) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  return (
    <CreateClientDialog {...{ showNewTeamDialog, setShowNewTeamDialog }}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team..."
            className={cn("w-full justify-between", className)}>
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${field.value}.png`}
                alt={field.value}
                className="grayscale"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {field.value ? clients.find((_) => _.id === field.value)?.name : "Select a team..."}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search a team..." />
              <CommandEmpty>No team found.</CommandEmpty>

              {clients.map((_) => (
                <CommandItem
                  key={_.id}
                  value={`${_.id}`}
                  onSelect={() => {
                    field.onChange(_.id);
                    setOpen(false);
                  }}
                  className="text-sm">
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${_.id}.png`}
                      alt={_.id}
                      className="grayscale"
                    />
                    <AvatarFallback>
                      {_.name?.split(" ")[0] ?? "T"}
                      {_.name?.split(" ")[1] ?? "M"}
                    </AvatarFallback>
                  </Avatar>
                  {_.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      field.value === _.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}>
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </CreateClientDialog>
  );
}
