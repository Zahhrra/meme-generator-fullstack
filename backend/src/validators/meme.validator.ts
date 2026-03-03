import { z } from "zod";

export const createMemeSchema = z.object({
  templateId: z.string().min(1, "Template ID tələb olunur"),
  topText: z.string().max(100, "Yuxarı mətn çox uzundur"),
  bottomText: z.string().max(100, "Aşağı mətn çox uzundur"),
});

export type CreateMemeDTO = z.infer<typeof createMemeSchema>;
