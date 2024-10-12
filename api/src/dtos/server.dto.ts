import { isBase64 } from "@utils/base64-manipulation.util";
import { z } from "zod";

export const createServerDto = z.object({
  name: z.string({ required_error: "Le nom du serveur est requis" }),
});
export type createServerDto = z.infer<typeof createServerDto>;

export const updateServerBannerDto = z
  .object({
    banner: z.string({ required_error: "Le banner est requis" }),
  })
  .refine((data) => isBase64(data.banner), {
    message: "La bannerière doit être un base64 valide",
    path: ["banner"],
  })
  .refine((data) => Buffer.from(data.banner, "base64").length <= 1024 * 1024, {
    message: "L'avatar ne doit pas dépasser 2 Mo",
    path: ["avatar"],
  });
export type updateServerBannerDto = z.infer<typeof updateServerBannerDto>;
