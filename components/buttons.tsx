"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

export function SignInButton() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const username = useAppSelector((state) => state.authReducer.value.username);

  useEffect(() => {
    if (session) {
      const isAdmin = !!(session.user?.email == "admin@gmail.com");
      dispatch(
        logIn({
          ...session?.user,
          isAdmin,
        })
      );
    } else {
      dispatch(logOut());
    }
  }, [session]);

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <div className="group relative min-w-[80px] p-2 text-sm font-normal">
        <span className="capitalize">Hi, {username}</span>
        <div className="absolute top-full left-0 p-2 bg-slate-800 invisible group-hover:visible">
          <SignOutButton />
        </div>
      </div>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
