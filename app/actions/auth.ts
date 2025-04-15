"use server";

import { SignupFormSchema, FormState } from "@/validations/signup-validations";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
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
      values: { name, email, password },
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check is email already exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return {
        values: { name, email, password },
        errors: { email: ["Email already exists!"] },
      };
    }

    // Insert the user into the database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred while creating your account.",
    };
  }

  redirect("/login");
}
