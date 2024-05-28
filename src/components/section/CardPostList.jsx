import React from "react";
import { blog } from "@/constant";
import CardPost from "@/components/CardPost";
import PaginationPage from "../PaginationPage";

const getData = async (page, cat) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}&cat=${
      cat || ""
    }`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function CardPostList({ page, cat }) {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 3;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className="max-w-[500px] lg:max-w-full">
      <h2 className="text-xl md:text-2xl font-medium md:font-bold">
        Recent Posts
      </h2>
      <div className="flex flex-col gap-y-10 md:gap-y-14 lg:gap-y-20 mt-7 lg:mt-11">
        {posts?.map((post) => (
          <CardPost post={post} key={post._id} />
        ))}
        <div className="max-w-[350px] md:max-w-[500px] mx-auto">
          <PaginationPage page={page} hasPrev={hasPrev} hasNext={hasNext} />
        </div>
      </div>
    </div>
  );
}
