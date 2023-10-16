"use client";
import { SignInButton } from "@/components/buttons";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsCartFill } from "react-icons/bs";

type Props = {};

export default function NavMenu({}: Props) {
  const isAdmin = useAppSelector((state) => state.authReducer.value.isAdmin);
  const carts = useAppSelector((state) => state.entitiesReducer.carts);

  return (
    <nav className="flex items-center justify-between py-6 px-8 xl:px-20 bg-slate-600">
      <Link href="/">
        <Image
          src={"/next.svg"}
          className="dark:invert"
          alt="logo"
          width={120}
          height={32}
        />
      </Link>
      <ul className="flex items-center font-medium">
        <div className="mr-8 pr-8 flex gap-8 border-r">
          {isAdmin ? (
            <>
              <li className="hover:opacity-50">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="hover:opacity-50">
                <Link href={"/master-dp-c"}>Master Data Product Category</Link>
              </li>
              <li className="hover:opacity-50">
                <Link href={"/master-dp"}>Master Data Product</Link>
              </li>
              <li className="hover:opacity-50">
                <Link href={"/manage-transaction"}>Manage Transaction</Link>
              </li>
            </>
          ) : (
            <li className="hover:opacity-50 ">
              <Link href={"/transaction"}>Transaction</Link>
            </li>
          )}
        </div>
        <li className="relative mr-4 text-lg">
          <BsCartFill />
          {carts.length ? (
            <span className="flex justify-center items-center bg-red-400 rounded-full absolute -top-3 -right-3 w-5 h-5 text-xs">
              {carts.length}
            </span>
          ) : null}
        </li>
        <li className="font-bold">
          <SignInButton />
        </li>
      </ul>
    </nav>
  );
}
