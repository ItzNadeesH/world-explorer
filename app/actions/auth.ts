"use server";

import { SignupFormSchema, FormState } from "@/validations/signup-validations";
import bcrypt from "bcryptjs";

export async function signup(state: FormState, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({ name, email, password });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: { name, email, password },
    };
  }

  // Call the provider or db to create a user...
}
