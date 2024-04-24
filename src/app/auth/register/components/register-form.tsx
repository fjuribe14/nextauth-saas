"use client";

import TeamSwitcher from "@/components/team-switcher";

import { z } from "zod";

const registerClientFormSchema = z.object({
  username: z.string().min(2).max(50),
  name: z.string({}),
  description: z.string({}),
});

const registerUserFormSchema = z.object({
  username: z.string().min(2).max(50),
});

function RegisterForm() {
  return (
    <div className="grid space-y-6">
      Enter
      <TeamSwitcher />
    </div>
  );
}

export default RegisterForm;
