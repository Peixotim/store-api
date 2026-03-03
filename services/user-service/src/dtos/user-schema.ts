import { z } from "zod";

export const createUserSchema = z.object({
  name : z.string().min(3),
  email : z.string().email(),
  password : z.string(),
  cpf : z.string().length(11),
  zipcode : z.string(),
})

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export const emailParamSchema = z.object({
  email: z.string().email(),
});

export const cpfParamSchema = z.object({
  cpf: z.string().min(11).max(14),
});

export type CreateUserInput = z.infer<typeof createUserSchema>