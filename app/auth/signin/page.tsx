import React from "react";
import LoginForm from "./LoginForm";

type Props = {};

export default async function SigninPage({}: Props) {
  const users = (await fetch("https://fakestoreapi.com/users")).body;

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <LoginForm users={users} />
    </div>
  );
}
