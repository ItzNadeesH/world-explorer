"use client";

import React, { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [state, dispatch, isPending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen -mt-10 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Image src="/logo.svg" alt="logo" width={64} height={64} className="mx-auto" />
      <h2 className="mt-2 mb-2 text-center text-2xl md:text-4xl font-bold tracking-tight text-gray-900">
        Welcome to World Explorer
      </h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-2 text-center text-sm text-gray-600">
          Discover countries, explore their cultures with real-time data from around the globe.
        </p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-sm text-center text-red-700">{state?.message}</p>
        <form action={dispatch} className="space-y-3" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
              />
            </div>
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
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-md  bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:bg-black/80 disabled:cursor-default cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm/6 text-gray-500">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold text-black hover:text-black/90">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
