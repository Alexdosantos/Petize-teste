import * as z from "zod";

export const gitUserSchema = z.object({
  username: z.string(),
});
