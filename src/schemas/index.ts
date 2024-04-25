import { z } from "zod";

export const loginUserFormSchema = z.object({
  client: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(50),
});
