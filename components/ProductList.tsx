"use client";

import { addToCart, fetchAllProducts } from "@/redux/features/entities-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";

export default function ProductList() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const products = useAppSelector((state) => state.entitiesReducer.products);

  const userId = useAppSelector((state) => state.authReducer.value.id);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts());
    }
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4 max-w-[1200px]">
      {products.map(
        ({
          id,
          title,
          price,
          image,
          category,
          rating: { rate, count },
        }: any) => (
          <div
            key={id}
            className="relative group bg-slate-700 p-3 rounded overflow-hidden"
          >
            <img
              src={image}
              alt={title}
              className="h-48 w-full object-contain bg-white rounded"
            />
            <h1 className="line-clamp-1 mt-2 text-sm">{title}</h1>
            <p className="text-xs font-bold my-1 opacity-50">
              {category.toUpperCase()}
            </p>
            <p className="font-medium">${price}</p>
            <div
              onClick={() =>
                dispatch(addToCart({ productId: id, quantity: 1 }))
              }
              className="opacity-0 text-xl group-hover:opacity-100 transition-opacity bg-slate-800 px-6 py-3 absolute bottom-0 right-0 cursor-pointer rounded-tl"
            >
              <BsCartPlus />
            </div>
          </div>
        )
      )}
    </div>
  );
}
