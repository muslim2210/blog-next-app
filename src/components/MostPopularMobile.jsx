"use client";
import React, { useState } from "react";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { blog } from "@/constant";
import MostPopular from "./MostPopular";
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

const links = [
  {
    id: 1,
    name: "Most Popular",
  },
];

const MostPopularMobile = () => {
  const [heading, setHeading] = useState("");
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/recommend`,
    fetcher
  );
  return (
    <>
      {links.map((link) => (
        <div key={link.id}>
          <div className="ml-5 cursor-pointer">
            <h1
              className="py-4 flex gap-x-2 items-center"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
              }}
            >
              <BiChevronRight
                className={`${heading === link.name ? "hidden" : "block"}`}
              />
              <BiChevronDown
                className={`${heading === link.name ? "block" : "hidden"}`}
              />
              {link.name}
            </h1>
            <hr className="h-[1px] bg-muted dark:bg-muted-foreground" />
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "lg:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}

            <div className="flex flex-col ml-10 py-3 gap-y-4">
              {data?.slice(0, 3).map((post) => (
                <MostPopular
                  key={post.id}
                  post={post}
                  titleStyle="text-sm font-medium"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MostPopularMobile;
