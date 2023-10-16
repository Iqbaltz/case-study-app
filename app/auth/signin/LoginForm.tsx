"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEventHandler } from "react";

type Props = { users: any };

export default function LoginForm({ users }: Props) {
  const { push } = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userInfo = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });

    if (res?.ok) {
      push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-slate-800 p-8 rounded"
    >
      <h1 className="text-center font-bold text-xl mb-6">Login</h1>
      <div className="flex flex-col mb-2">
        <label htmlFor="username" className="text-xs">
          Username
        </label>
        <input
          name="username"
          id="username"
          type="username"
          placeholder="ex. user"
          className="px-2 py-1 mt-1 text-black"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="text-xs">
          Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="password"
          className="px-2 py-1 mt-1 text-black"
        />
      </div>
      <button type="submit" className="rounded p-2 bg-slate-600">
        Login
      </button>
    </form>
  );
}
