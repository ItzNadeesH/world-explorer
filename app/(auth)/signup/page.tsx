"use client";

import React, { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  const [state, dispatch, isPending] = useActionState(signup, undefined);

  return (
    <div className="flex min-h-screen -mt-10 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/logo.svg" alt="logo" width={40} height={40} className="mx-auto" />

        <h2 className="mt-2 text-center text-xl/9 font-bold tracking-tight text-gray-900">
          Welcome to World Explorer
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Discover countries, explore their cultures with real-time data from around the globe.
        </p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={dispatch} className="space-y-3" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={state?.values.name}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
              />
            </div>
            {state?.errors?.name && <p className="text-xs text-red-700">{state.errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={state?.values.email}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
              />
            </div>
            {state?.errors?.email && <p className="text-xs text-red-700">{state.errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                defaultValue={state?.values.password}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
              />
            </div>
            {state?.errors?.password && (
              <div className="text-xs text-red-700">
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black hover:text-black/90">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
