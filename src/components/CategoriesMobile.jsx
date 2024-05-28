"use client";
import React, { useState } from "react";

import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import CategoryItem from "./CategoryItem";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export default function CategoriesMobile() {
  const [heading, setHeading] = useState("");

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    fetcher
  );

  return (
    <>
      <div className="ml-5 cursor-pointer">
        <h1
          className="py-4 flex gap-x-2 items-center"
          onClick={() => {
            heading !== "categories"
              ? setHeading("categories")
              : setHeading("");
          }}
        >
          <BiChevronRight
            className={`${heading === "categories" ? "hidden" : "block"}`}
          />
          <BiChevronDown
            className={`${heading === "categories" ? "block" : "hidden"}`}
          />
          categories
        </h1>
        <hr className="h-[1px] bg-muted dark:bg-muted-foreground" />
      </div>
      {/* Mobile menus */}
      <div
        className={`
        ${heading === "categories" ? "lg:hidden" : "hidden"}
      `}
      >
        {/* sublinks */}

        <div className="ml-10 mt-2 py-2 gap-4 font-semibold flex flex-wrap items-center">
          {data?.map((item) => (
            <CategoryItem
              key={item._id}
              {...item}
              containerStyles="py-1 px-2 rounded-xl max-w-[100px]"
              linkStyles="flex justify-center items-center"
              imageContainerStyles="hidden"
              imageStyles="hidden"
              textStyles="text-sm font-medium hover:text-primary"
            />
          ))}
        </div>
      </div>
    </>
  );
}
