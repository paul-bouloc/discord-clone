import { z } from "zod";

export const memberRoleDto = z.object({
  role: z.enum(["ADMIN", "MODERATOR", "USER"]),
});
export type memberRoleDto = z.infer<typeof memberRoleDto>;
